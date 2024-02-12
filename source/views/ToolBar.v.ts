import { Mode, refs, RxNodeDecl } from "reactronic"
import { Section, Img, startNewRow, El } from "verstak"
import { Icon, Field, Theme, Markdown, composeFieldModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function ToolBar(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Section(declaration, {
      formula: b => {
        const app = App.actual
        const theme = Theme.actual as AppTheme
        // Image({ // logo
        //   initialize(b, base) {
        //     base()
        //     b.contentAlignment = Align.stretch
        //     b.boundsAlignment = Align.stretch
        //     b.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
        //     b.native.className = cx(s.Panel, s.Clickable, s.Logo)
        //     b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
        //   },
        //   update(b, base) {
        //     base()
        //     b.native.style.backgroundColor = app.blinkingEffect ? "red" : ""
        //   }
        // })
        Section({ // Logo
          activation(b) {
            b.useStylingPreset(theme.panel)
            // b.useStyle(s.Clickable)
            // b.useStyle(s.Logo)
            b.native.style.outlineOffset = "-1px"
            // b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          formula: b => {
            b.native.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
            Img({
              formula: (b, base) => {
                base()
                b.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              }
            })
          }
        })
        Section({
          formula: b => {
            b.widthMerelyGrowth = 1
            b.useStylingPreset(theme.panel)
            Section({
              mode: Mode.independentUpdate,
              formula: b => {
                b.widthMerelyGrowth = 1
                const position = app.position
                if (!Number.isFinite(position))
                  Markdown(`**Verstak** v${app.version}`)
                else
                  Markdown(`**Verstak** v${app.version} (${position})`)
                startNewRow()
                Markdown("Try to *change* window size")
              }
            })
            Field({
              activation(b, base) {
                const loader = app.loader
                b.widthMerelyMin = "7em"
                b.model = composeFieldModel({
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
          activation(b) {
            // b.native.onclick = () => Transaction.run(null, () => app.nextTheme())
          },
          formula: b => {
            b.useStylingPreset(theme.panel)
            // b.useStyle(s.Hint)
            // b.useStyle(s.Clickable)
            Icon("fa-solid fa-bars")
          }
        })
      }},
    )
  )
}
