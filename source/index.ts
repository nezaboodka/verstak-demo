import { Transaction } from "reactronic"
import { VBlock, HtmlBody } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { Main } from "views/Main.v"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"
import "theme/code.light.css"
import "theme/code.dark.css"
import "theme/code.print.css"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () => new App(version))

VBlock.root(() => {
  HtmlBody("html > body", body => {
    body.className = "light"
    Main("main", app)
  })
})
