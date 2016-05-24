package handler

import (
	"strconv"

	"github.com/dinever/golf"
	"github.com/dingoblog/dingo/app/model"
)

func registerPostHandlers(app *golf.Application) {
	app.Get("/api/posts", APIPostsHandler)
	app.Get("/api/posts/:id", APIPostHandler)
	app.Get("/api/posts/slug/:slug", APIPostSlugHandler)
}

// APIPostHandler retrieves the post with the given ID.
func APIPostHandler(ctx *golf.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		handleErr(ctx, 500, err)
		return
	}
	post := &model.Post{Id: int64(id)}
	err = post.GetPostById()
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(post, "", "  ")
}

// APIPostSlugHandler retrieves the post with the given slug.
func APIPostSlugHandler(ctx *golf.Context) {
	slug := ctx.Param("slug")
	post := new(model.Post)
	err := post.GetPostBySlug(slug)
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(post, "", "  ")
}

// APIPostsHandler gets every page, ordered by publication date.
func APIPostsHandler(ctx *golf.Context) {
	posts := new(model.Posts)
	err := posts.GetAllPostList(false, true, "published_at DESC")
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(posts, "", "  ")
}
