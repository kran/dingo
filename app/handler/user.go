package handler

import (
	"strconv"

	"github.com/dinever/golf"
	"github.com/dingoblog/dingo/app/model"
)

func registerUserHandlers(app *golf.Application) {
	app.Get("/api/users", APIUsersHandler)
	app.Get("/api/users/:id", APIUserHandler)
	app.Get("/api/users/slug/:slug", APIUserSlugHandler)
	app.Get("/api/users/email/:email", APIUserEmailHandler)
}

// APIUserHandler retrieves the user with the given id.
func APIUserHandler(ctx *golf.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		handleErr(ctx, 500, err)
		return
	}
	user := &model.User{Id: int64(id)}
	err = user.GetUserById()
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(user, "", "  ")
}

// APIUserSlugHandler retrives the user with the given slug.
func APIUserSlugHandler(ctx *golf.Context) {
	slug := ctx.Param("slug")
	user := &model.User{Slug: slug}
	err := user.GetUserBySlug()
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(user, "", "  ")
}

// APIUserEmailHandler retrieves the user with the given email.
func APIUserEmailHandler(ctx *golf.Context) {
	email := ctx.Param("email")
	user := &model.User{Email: email}
	err := user.GetUserByEmail()
	if err != nil {
		handleErr(ctx, 404, err)
		return
	}
	ctx.JSONIndent(user, "", "  ")
}

// APIUsersHandler retrieves all users.
func APIUsersHandler(ctx *golf.Context) {
	ctx.JSONIndent(map[string]interface{}{
		"message": "Not implemented",
	}, "", "  ")
}
