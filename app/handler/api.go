package handler

import (
	"github.com/dinever/golf"
)

// APIDocumentationHandler shows which routes match with what functionality,
// similar to https://api.github.com
func APIDocumentationHandler(ctx *golf.Context) {
	// Go doesn't display maps in the order they appear here, so if the order
	// of these routes is important, it might be better to use a struct
	routes := map[string]interface{}{
		"auth_url":              "/auth/",
		"api_documentation_url": "/api/",
		"comments_url":          "/api/comments",
		"comment_url":           "/api/comments/:id",
		"comment_post_url":      "/api/comments/post/:id",
		"posts_url":             "/api/posts/",
		"post_url":              "/api/posts/:id",
		"post_slug_url":         "/api/posts/slug/:slug",
		"tags_url":              "/api/tags/",
		"tag_url":               "/api/tags/:id",
		"tag_slug_url":          "/api/tags/slug/:slug",
		"users_url":             "/api/users/",
		"user_url":              "/api/users/:id",
		"user_slug_url":         "/api/users/slug/:slug",
		"user_email_url":        "/api/users/email/:email",
	}
	ctx.JSONIndent(routes, "", "  ")
}

// handleErr sends the staus code and error message formatted as JSON.
func handleErr(ctx *golf.Context, statusCode int, err error) {
	ctx.JSONIndent(map[string]interface{}{
		"statusCode": statusCode,
		"error":      err.Error(),
	}, "", "  ")
}
