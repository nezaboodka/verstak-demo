import { Transaction } from "reactronic"
import { VBlock, HtmlBody, nestedContext, lineFeed } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { MainWindow } from "views/MainWindow.v"
import { MarkdownCodeLightTheme } from "themes/MarkdownCodeLightTheme.s"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import { MarkdownCodePrintTheme } from "themes/MarkdownCodePrintTheme.s"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () =>
  new App(version,
    new MarkdownCodeLightTheme(),
    new MarkdownCodeDarkTheme(),
    new MarkdownCodePrintTheme()))

VBlock.root(() => {
  HtmlBody(b => {
    b.native.style.backgroundColor = "rgba(230, 230, 230)"
    nestedContext(App, app)
    lineFeed() // WORKAROUND
    MainWindow()
  })
})
