import { Transaction } from "reactronic"
import { Block, ReactiveHtmlBody } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { MainWindow } from "views/MainWindow.v"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () => new App(version))

Block.root(() => {
  ReactiveHtmlBody("html > body", null, body => {
    if (isMobile) {
      body.style.width = body.style.maxWidth = `${window.innerWidth}px`
      body.style.height = body.style.maxHeight = `${window.innerHeight}px`
      body.style.fontSize = "5vw"
    }
    else {
      body.style.width = body.style.maxWidth = "100vw"
      body.style.height = body.style.maxHeight = "100vh"
      body.style.fontSize = ""
    }
    MainWindow("main", app)
  })
})
