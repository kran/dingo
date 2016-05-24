package handler

import (
	"strconv"

	"github.com/dinever/golf"
	"github.com/dingoblog/dingo/app/model"
)

func registerCommentsHandlers(app *golf.Application) {
	app.Get("/api/comments", APICommentsHandler)
	app.Get("/api/comments/:id", APICommentHandler)
	app.Get("/api/comments/post/:id", APICommentPostHandler)
}

// APICommentHandler retrieves a comment with the given comment id.
func APICommentHandler(ctx *golf.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		handleErr(ctx, 500, err)
		return
	}
	comment := &model.Comment{Id: int64(id)}
	err = comment.GetCommentById()
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(comment, "", "  ")
}

// APICommentPostHandler retrives the tag with the given post id.
func APICommentPostHandler(ctx *golf.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		handleErr(ctx, 500, err)
		return
	}
	comments := new(model.Comments)
	err = comments.GetCommentsByPostId(int64(id))
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(comments, "", "  ")
}

// APICommentsHandler retrieves all the comments.
func APICommentsHandler(ctx *golf.Context) {
	ctx.JSONIndent(map[string]interface{}{
		"message": "Not implemented",
	}, "", "  ")
}
