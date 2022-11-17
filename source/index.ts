import { Transaction } from "reactronic"
import { VBlock, HtmlBody, nestedContext } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { MainWindow } from "views/MainWindow.v"
import { MarkdownCodeLightTheme } from "themes/MarkdownCodeLightTheme.s"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () =>
  new App(version, new MarkdownCodeLightTheme()))

VBlock.root(() => {
  HtmlBody(b => {
    nestedContext(App, app)
    MainWindow()
  })
})
