package main

import (
	"flag"
    "os"
    "log"
    "net/http"

	"github.com/dingoblog/dingo/app"
    "github.com/shurcooL/vfsgen"
)

func main() {
    if len(os.Args) == 2 && os.Args[1] == "gen" {
        var fs http.FileSystem = http.Dir("assets")

        err := vfsgen.Generate(fs, vfsgen.Options{
            Filename: "app/assets/assets-gen.go",
            PackageName: "assets",
            VariableName: "Assets",
        })

        if err != nil {
            log.Fatalln(err)
        } else {
            log.Print("generated")
        }

        os.Exit(0)
    }
	portPtr := flag.String("port", "8000", "The port number for Dingo to listen to.")
	dbFilePathPtr := flag.String("database", "dingo.db", "The database file path for Djingo to use.")
	privKeyPathPtr := flag.String("priv-key", "dingo.rsa", "The private key file path for JWT.")
	pubKeyPathPtr := flag.String("pub-key", "dingo.rsa.pub", "The public key file path for JWT.")
	flag.Parse()

	Dingo.Init(*dbFilePathPtr, *privKeyPathPtr, *pubKeyPathPtr)
	Dingo.Run(*portPtr)
}
