package model

import (
	"database/sql"
	"time"

	"fmt"
	"github.com/dingoblog/dingo/app/utils"
	"github.com/russross/meddler"
)

type Comments []*Comment

// Comment struct defines a comment item data.
type Comment struct {
	Id        int64      `meddler:"id,pk"`
	PostId    int64      `meddler:"post_id"`
	Author    string     `meddler:"author"`
	Email     string     `meddler:"author_email"`
	Avatar    string     `meddler:"author_avatar"`
	Website   string     `meddler:"author_url"`
	Ip        string     `meddler:"author_ip"`
	CreatedAt *time.Time `meddler:"created_at"`
	Content   string     `meddler:"content"`
	Approved  bool       `meddler:"approved"`
	UserAgent string     `meddler:"agent"`
	Type      string     `meddler:"type"`
	Parent    int64      `meddler:"parent"`
	UserId    int64      `meddler:"user_id"`
	Children  *Comments  `meddler:"-"`
}

func (c Comments) Len() int {
	return len(c)
}

func (c Comments) Get(i int) *Comment {
	return c[i]
}

func (c Comments) GetAll() []*Comment {
	return c
}

func NewComment() *Comment {
	return &Comment{
		CreatedAt: utils.Now(),
	}
}

func (c *Comment) Save() error {
	c.Avatar = utils.Gravatar(c.Email, "50")
	err := meddler.Save(db, "comments", c)
	return err
}

func (c *Comment) ToJson() map[string]interface{} {
	m := make(map[string]interface{})
	m["id"] = c.Id
	m["author"] = c.Author
	m["email"] = c.Email
	m["website"] = c.Website
	m["avatar"] = c.Avatar
	m["content"] = c.Content
	m["create_time"] = c.CreatedAt.Unix()
	m["pid"] = c.Parent
	m["approved"] = c.Approved
	m["ip"] = c.Ip
	m["user_agent"] = c.UserAgent
	m["parent_content"] = c.ParentContent()
	return m
}

func (c *Comment) ParentContent() string {
	if c.Parent < 1 {
		return ""
	}

	comment := &Comment{Id: c.Parent}
	err := comment.GetCommentById()
	if err != nil {
		return "> Comment not found."
	}
	str := "> @" + comment.Author + "\n\n"
	str += "> " + comment.Content + "\n"
	return str
}

func GetNumberOfComments() (int64, error) {
	var count int64
	var row *sql.Row
	row = db.QueryRow(stmtGetAllCommentCount)
	err := row.Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (comments *Comments) GetCommentList(page, size int64, onlyApproved bool) (*utils.Pager, error) {
	var pager *utils.Pager

	count, err := GetNumberOfComments()
	pager = utils.NewPager(page, size, count)

	if !pager.IsValid {
		return pager, fmt.Errorf("Page not found")
	}

	var where string
	if onlyApproved {
		where = `WHERE approved = 1`
	}

	err = meddler.QueryAll(db, comments, fmt.Sprintf(stmtGetCommentList, where), size, pager.Begin)
	return pager, err
}

func (comment *Comment) GetCommentById() error {
	err := meddler.QueryRow(db, comment, stmtGetCommentById, comment.Id)
	return err
}

func (comment *Comment) getChildComments() (*Comments, error) {
	comments := new(Comments)
	err := meddler.QueryAll(db, comments, stmtGetCommentsByParentId, comment.Id)
	return comments, err
}

func (comment *Comment) ParentComment() (*Comment, error) {
	parent := NewComment()
	parent.Id = comment.Parent
	return parent, parent.GetCommentById()
}

func (comment *Comment) Post() *Post {
	post := NewPost()
	post.Id = comment.PostId
	post.GetPostById()
	return post
}

func (comments *Comments) GetCommentsByPostId(id int64) error {
	err := meddler.QueryAll(db, comments, stmtGetParentCommentsByPostId, id)
	for _, c := range *comments {
		buildCommentTree(c, c, 1)
	}
	return err
}

func buildCommentTree(p *Comment, c *Comment, level int) {
	childComments, _ := c.getChildComments()
	if p.Children == nil {
		p.Children = childComments
	} else {
		newChildComments := append(*p.Children, *childComments...)
		p.Children = &newChildComments
	}
	for _, c := range *childComments {
		if level >= 2 {
			buildCommentTree(p, c, level+1)
		} else {
			buildCommentTree(c, c, level+1)
		}
	}
}

func DeleteComment(id int64) error {
	writeDB, err := db.Begin()
	if err != nil {
		writeDB.Rollback()
		return err
	}
	_, err = writeDB.Exec(stmtDeleteCommentById, id)
	if err != nil {
		writeDB.Rollback()
		return err
	}
	return writeDB.Commit()
}

func (c *Comment) ValidateComment() string {
	if utils.IsEmptyString(c.Author) || utils.IsEmptyString(c.Content) {
		return "Name, Email and Content are required fields."
	}
	if !utils.IsEmail(c.Email) {
		return "Email format not valid."
	}
	if !utils.IsEmptyString(c.Website) && !utils.IsURL(c.Website) {
		return "Website URL format not valid."
	}
	return ""
}

const stmtGetAllCommentCount = `SELECT count(*) FROM comments`
const stmtDeleteCommentById = `DELETE FROM comments WHERE id = ?`
const stmtGetCommentList = `SELECT * FROM comments %s ORDER BY created_at DESC LIMIT ? OFFSET ?`
const stmtGetCommentById = `SELECT * FROM comments WHERE id = ?`
const stmtGetCommentsByPostId = `SELECT * FROM comments WHERE post_id = ? AND approved = 1 AND parent = 0`
const stmtGetParentCommentsByPostId = `SELECT * FROM comments WHERE post_id = ? AND approved = 1 AND parent = 0`
const stmtGetCommentsByParentId = `SELECT * FROM comments WHERE parent = ? AND approved = 1`
