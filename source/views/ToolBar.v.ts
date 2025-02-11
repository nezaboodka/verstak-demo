import { Mode, pause, refs } from "reactronic"
import { Panel, rowBreak, Horizontal } from "verstak"
import { Img } from "verstak/html"
import { Icon, Field, Theme, Markdown, composeFieldModel } from "verstak/express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function toolBar() {
  const app = App.current
  const theme = Theme.current as AppTheme
  // Image({ // logo
  //   preparation: (el, base) => {
  //     base()
  //     el.contentAlignment = Align.stretch
  //     el.boundsAlignment = Align.stretch
  //     el.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
  //     el.native.className = cx(s.Panel, s.Clickable, s.Logo)
  //     el.native.onclick = () => impact(() => app.blinkingEffect = !app.blinkingEffect)
  //   },
  //   script: (el, base) => {
  //     base()
  //     el.style.backgroundColor = app.blinkingEffect ? "red" : ""
  //   }
  // })
  Panel({ // Logo
    preparation: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Clickable)
      // b.useStyle(s.Logo)
      el.style.outlineOffset = "-1px"
      // b.native.onclick = () => impact(() => app.blinkingEffect = !app.blinkingEffect)
    },
    scriptAsync: async el => {
      el.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
      await pause(3000)
      Img({
        script: (el, base) => {
          base()
          el.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
        }
      })
    }
  })
  Panel({
    script: el => {
      el.horizontally = Horizontal.stretch
      el.useStylingPreset(theme.panel)
      Panel({
        mode: Mode.autonomous,
        script: el => {
          el.horizontally = Horizontal.stretch
          const position = app.position
          if (!Number.isFinite(position))
            Markdown(`**Verstak** v${app.version}`)
          else
            Markdown(`**Verstak** v${app.version} (${position})`)
          rowBreak()
          Markdown("Try to *change* window size")
        }
      })
      Field({
        preparation: (el, base) => {
          const loader = app.loader
          el.width = { min: "7em" }
          el.model = composeFieldModel({
            icon: "fa-solid fa-search",
            text: refs(loader).filter,
            options: refs(loader).loaded,
            position: refs(app).position,
            isHotText: true,
            isMultiLineText: false,
          })
          base()
        },
      })
    }
  })
  Panel({ // Account
    preparation: el => {
      // el.native.onclick = () => impact(() => app.nextTheme())
    },
    script: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Hint)
      // b.useStyle(s.Clickable)
      Icon("fa-solid fa-bars")
    }
  })
}
