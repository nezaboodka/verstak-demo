import { Mode, refs } from "reactronic"
import { Section, Img, rowBreak, Alignment, VerticalAlignment } from "verstak"
import { Icon, Field, Theme, Markdown, composeFieldModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function toolBar() {
  const app = App.current
  const theme = Theme.current as AppTheme
  // Image({ // logo
  //   onCreate: (el, base) => {
  //     base()
  //     el.contentAlignment = Align.stretch
  //     el.boundsAlignment = Align.stretch
  //     el.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
  //     el.native.className = cx(s.Panel, s.Clickable, s.Logo)
  //     el.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
  //   },
  //   onChange: (el, base) => {
  //     base()
  //     el.style.backgroundColor = app.blinkingEffect ? "red" : ""
  //   }
  // })
  Section({ // Logo
    onCreate: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Clickable)
      // b.useStyle(s.Logo)
      el.style.outlineOffset = "-1px"
      // b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
    },
    onChange: el => {
      el.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
      Img({
        onChange: (el, base) => {
          base()
          el.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
        }
      })
    }
  })
  Section({
    onChange: el => {
      el.alignment = Alignment.stretch
      el.useStylingPreset(theme.panel)
      Section({
        mode: Mode.independentUpdate,
        onChange: el => {
          el.alignment = Alignment.stretch
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
        onCreate: (el, base) => {
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
  Section({ // Account
    onCreate: el => {
      // el.native.onclick = () => Transaction.run(null, () => app.nextTheme())
    },
    onChange: el => {
      el.useStylingPreset(theme.panel)
      // b.useStyle(s.Hint)
      // b.useStyle(s.Clickable)
      Icon("fa-solid fa-bars")
    }
  })
}
