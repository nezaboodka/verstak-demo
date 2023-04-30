import { Transaction } from "reactronic"
import { HtmlBody, fromNewRow, Mode } from "verstak"
import { configureDebugging } from "dbg"
import { $app, App } from "models/App"
import { MainWindow } from "views/MainWindow.v"
import { LightAppTheme } from "themes/LightAppTheme.s"
import { DarkAppTheme } from "themes/DarkAppTheme.s"
import { PrintAppTheme } from "themes/PrintAppTheme.s"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () =>
  new App(version,
    new LightAppTheme(),
    new DarkAppTheme(),
    new PrintAppTheme()))

HtmlBody({
  modes: Mode.PinpointRefresh,
  render(b) {
    $app.value = app
    const t = app.theme
    const s = b.native.style
    s.color = t.textColor
    s.backgroundColor = t.spaceFillColor
    fromNewRow() // WORKAROUND
    MainWindow()
  }
})
