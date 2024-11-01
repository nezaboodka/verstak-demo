import { Transaction, Mode } from "reactronic"
import { Page, rowBreak } from "verstak"
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

Page({
  mode: Mode.autonomous,
  content: el => {
    App.current = app
    const t = app.theme
    const s = el.style
    s.color = t.textColor
    s.backgroundColor = t.spaceFillColor
    el.useStylingPreset(t.page)
    rowBreak() // WORKAROUND
    MainWindow()
  }
})
