import { Mode, pause, refs } from "reactronic"
import { Element, rowBreak, H, Icon, Input, Theme, Markdown, composeInputModel } from "verstak"
import { Img } from "verstak/html"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"

export function toolBar() {
  const app = DemoApp.current
  const theme = Theme.current as AppTheme
  // Image({ // logo
  //   creation(el, base) {
  //     base()
  //     this.contentAlignment = Align.stretch
  //     this.boundsAlignment = Align.stretch
  //     this.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
  //     this.native.classList.add(cx(s.Panel, s.Clickable, s.Logo))
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
  Element({ // Logo
    mode: Mode.primitive,
    creation() {
      this.useStylingPreset(theme.panel)
      // b.useStyle(s.Clickable)
      // b.useStyle(s.Logo)
      this.style.outlineOffset = "-1px"
    },
    setup() {
      this.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
      Img({
        mode: Mode.primitive,
        setup(el, base) {
          base()
          this.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
        }
      })
      //
      // OnClick(el.native, () => {
      //   app.blinkingEffect = !app.blinkingEffect
      // })
    },
    // async bodyTask() {
    //   this.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
    //   await pause(3000)
    //   Img({
    //     mode: Mode.primitive,
    //     setup(el, base) {
    //       base()
    //       this.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
    //     }
    //   })
    //   //
    //   // OnClick(el.native, () => {
    //   //   app.blinkingEffect = !app.blinkingEffect
    //   // })
    // }
  })
  Element({
    mode: Mode.primitive,
    setup() {
      // this.useStylingPreset(theme.panel)
      this.selfAlignmentHorizontal = H.stretch
      this.alignmentHorizontal = H.stretch
      Element({
        setup(el, base) {
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
        creation(el, base) {
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
  Element({ // Account
    mode: Mode.primitive,
    setup() {
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
