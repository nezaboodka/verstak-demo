import { Mode } from "reactronic"
import { RealTimeClock, Window, rowBreak } from "verstak"
import { configureDebugging } from "dbg.js"
import { DemoApp } from "models/DemoApp.js"
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
    DemoApp.current = new DemoApp(version,
      new LightAppTheme(),
      new DarkAppTheme(),
      new PrintAppTheme())
  },
  script: el => {
    const clock = new RealTimeClock(200)
    const theme = DemoApp.current.theme
    const s = el.style
    s.color = theme.textColor
    s.backgroundColor = theme.spaceFillColor
    el.useStylingPreset(theme.page)
    rowBreak() // WORKAROUND
    MainWindow(clock)
  }
})
