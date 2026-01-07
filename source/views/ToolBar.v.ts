import { Mode, pause, refs } from "reactronic"
import { Block, rowBreak, Horizontal, Icon, Input, Theme, Markdown, composeInputModel } from "verstak"
import { Img } from "verstak/html"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"

export function toolBar() {
  const app = DemoApp.current
  const theme = Theme.current as AppTheme
  // Image({ // logo
  //   preparation(el, base) {
  //     base()
  //     this.contentAlignment = Align.stretch
  //     this.boundsAlignment = Align.stretch
  //     this.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
  //     this.native.className = cx(s.Panel, s.Clickable, s.Logo)
  //   },
  //   script(el, base) {
  //     base()
  //     this.style.backgroundColor = app.blinkingEffect ? "red" : ""
  //
  //     OnClick(this.native, () => {
  //       app.blinkingEffect = !app.blinkingEffect
  //     })
  //   }
  // })
  Block({ // Logo
    preparation() {
      this.useStylingPreset(theme.panel)
      // b.useStyle(s.Clickable)
      // b.useStyle(s.Logo)
      this.style.outlineOffset = "-1px"
    },
    async scriptAsync() {
      this.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
      await pause(3000)
      Img({
        script(el, base) {
          base()
          this.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
        }
      })
      //
      // OnClick(el.native, () => {
      //   app.blinkingEffect = !app.blinkingEffect
      // })
    }
  })
  Block({
    script() {
      this.horizontally = Horizontal.stretch
      this.useStylingPreset(theme.panel)
      Block({
        mode: Mode.autonomous,
        script() {
          this.horizontally = Horizontal.stretch
          const position = app.position
          if (!Number.isFinite(position))
            Markdown(`**Verstak** v${app.version}`)
          else
            Markdown(`**Verstak** v${app.version} (${position})`)
          rowBreak()
          Markdown("Try to *change* window size")
        }
      })
      Input({
        preparation(el, base) {
          const loader = app.loader
          this.width = { min: "7em" }
          this.model = composeInputModel({
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
  Block({ // Account
    script() {
      this.useStylingPreset(theme.panel)
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
