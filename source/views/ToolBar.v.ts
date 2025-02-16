import { Mode, pause, refs } from "reactronic"
import { Panel, rowBreak, Horizontal, Icon, Field, Theme, Markdown, composeFieldModel } from "verstak"
import { Img } from "verstak/html"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"

export function toolBar() {
  const app = DemoApp.current
  const theme = Theme.current as AppTheme
  // Image({ // logo
  //   preparation: (el, base) => {
  //     base()
  //     el.contentAlignment = Align.stretch
  //     el.boundsAlignment = Align.stretch
  //     el.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
  //     el.native.className = cx(s.Panel, s.Clickable, s.Logo)
  //   },
  //   script: (el, base) => {
  //     base()
  //     el.style.backgroundColor = app.blinkingEffect ? "red" : ""
  //
  //     OnClick(el.native, () => {
  //       app.blinkingEffect = !app.blinkingEffect
  //     })
  //   }
  // })
  Panel({ // Logo
    preparation: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Clickable)
      // b.useStyle(s.Logo)
      el.style.outlineOffset = "-1px"
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
      //
      // OnClick(el.native, () => {
      //   app.blinkingEffect = !app.blinkingEffect
      // })
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
    script: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Hint)
      // b.useStyle(s.Clickable)
      Icon("fa-solid fa-bars")
      //
      // OnClick(el.native, () => {
      //   app.nextTheme()
      // })
    }
  })
}
