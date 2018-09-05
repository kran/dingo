package assets

import(
    "net/http"
	"github.com/dinever/golf"
    "io/ioutil"
    "path"
)

func VfsMiddleware(next golf.HandlerFunc) golf.HandlerFunc {
	fn := func(ctx *golf.Context) {
        filePath := ctx.Request.URL.Path
        file, err := Assets.Open(filePath)
        if err != nil {
            next(ctx)
            return
        }

        defer file.Close()
        stat, _ := file.Stat()

        if stat.IsDir() {
            next(ctx)
            return
        }

        http.ServeContent(ctx.Response, ctx.Request, filePath, stat.ModTime(), file)
	}
	return fn
}

type VfsMapLoader struct {
    BaseDir string
}


func (loader *VfsMapLoader) LoadTemplate(name string) (string, error) {
	f, err := Assets.Open(path.Join(loader.BaseDir, name))
	if err != nil {
		return "", err
	}
	b, err := ioutil.ReadAll(f)
	return string(b), err
}

