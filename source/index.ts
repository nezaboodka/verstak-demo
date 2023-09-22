import { Transaction } from "reactronic"
import { HtmlBody, startNewRow, Mode } from "verstak"
import { configureDebugging } from "dbg.js"
import { App } from "models/App.js"
import { MainWindow } from "views/MainWindow.v.js"
import { LightAppTheme } from "themes/LightAppTheme.s.js"
import { DarkAppTheme } from "themes/DarkAppTheme.s.js"
import { PrintAppTheme } from "themes/PrintAppTheme.s.js"

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
  mode: Mode.PinpointRebuild,
  rebuild(b) {
    App.actual = app
    const t = app.theme
    const s = b.native.style
    s.color = t.textColor
    s.backgroundColor = t.spaceFillColor
    startNewRow() // WORKAROUND
    MainWindow()
  }
})
