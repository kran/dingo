**This project is under heavy development and is not ready for use. However, we'd love to have your contribution.**

![Dingo Logo](https://cloud.githubusercontent.com/assets/1311594/15427334/652081ae-1e62-11e6-9ae3-1dd0a667f22d.png)

[![CI status](https://img.shields.io/travis/dingoblog/dingo.svg)](https://travis-ci.org/dingoblog/dingo/)
[![Gitter](https://badges.gitter.im/dingoblog/dingo.svg)](https://gitter.im/dingoblog/dingo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Dingo is a full-featured blog engine written in Go.

![Dingo](https://cloud.githubusercontent.com/assets/1311594/14765958/0e6dcccc-09c7-11e6-96f3-5487b6732371.png)

## Main Features

- **Blog Comments**: Dingo has a built-in comment system.
- **Markdown Editor**: You can write your post in markdown format, with a beautiful markdown editor.
- **Powerful Admin Panel**: Dingo has a powerful dashboard, in which you can view various information about your blog.

## Installation

```
$ go get github.com/dingoblog/dingo
```

## Run the Server

```
$ cd $GOPATH/src/github.com/dingoblog/dingo
$ go run main.go --port 8000
```

## Contributing

To contribute, please take a look at our [roadmap](https://github.com/dingoblog/dingo/issues/7) to find the issue that you would like to work on.

To read the source code, please start from the [URL endpoints](https://github.com/dingoblog/dingo/blob/master/app/app.go#L71)

## Admin Panel

Plase visit [http://localhost:8000/signup/](http://localhost:8000/signup/) to register a new user and [http://localhost:8000/login/](http://localhost:8000/login/) to log into the admin panel.

## LICENSE

[MIT LICENSE](/LICENSE)
