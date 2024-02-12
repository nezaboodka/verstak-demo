import { Mode, refs, RxNodeDecl } from "reactronic"
import { Section, Img, startNewRow, El } from "verstak"
import { Icon, Field, Theme, Markdown, composeFieldModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function ToolBar(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Section(declaration, {
      formula: el => {
        const app = App.current
        const theme = Theme.current as AppTheme
        // Image({ // logo
        //   activation: (el, base) => {
        //     base()
        //     el.contentAlignment = Align.stretch
        //     el.boundsAlignment = Align.stretch
        //     el.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
        //     el.native.className = cx(s.Panel, s.Clickable, s.Logo)
        //     el.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
        //   },
        //   formula: (el, base) => {
        //     base()
        //     el.native.style.backgroundColor = app.blinkingEffect ? "red" : ""
        //   }
        // })
        Section({ // Logo
          activation: el => {
            el.useStylingPreset(theme.panel)
            // b.useStyle(s.Clickable)
            // b.useStyle(s.Logo)
            el.native.style.outlineOffset = "-1px"
            // b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          formula: el => {
            el.native.style.boxShadow = app.isBlinkingEffectOn ? "0.025rem 0.025rem 0.35rem 0 red" : ""
            Img({
              formula: (el, base) => {
                base()
                el.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              }
            })
          }
        })
        Section({
          formula: el => {
            el.widthMerelyGrowth = 1
            el.useStylingPreset(theme.panel)
            Section({
              mode: Mode.independentUpdate,
              formula: el => {
                el.widthMerelyGrowth = 1
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
              activation: (el, base) => {
                const loader = app.loader
                el.widthMerelyMin = "7em"
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
          activation: el => {
            // el.native.onclick = () => Transaction.run(null, () => app.nextTheme())
          },
          formula: el => {
            el.useStylingPreset(theme.panel)
            // b.useStyle(s.Hint)
            // b.useStyle(s.Clickable)
            Icon("fa-solid fa-bars")
          }
        })
      }},
    )
  )
}
