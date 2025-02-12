import { apply, Mode } from "reactronic"
import { Window, rowBreak } from "verstak"
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

Window({
  mode: Mode.autonomous,
  preparation: el => {
    App.current = new App(version,
      new LightAppTheme(),
      new DarkAppTheme(),
      new PrintAppTheme())
  },
  script: el => {
    const t = App.current.theme
    const s = el.style
    s.color = t.textColor
    s.backgroundColor = t.spaceFillColor
    el.useStylingPreset(t.page)
    rowBreak() // WORKAROUND
    MainWindow()
  }
})
