import { refs } from "reactronic"
import { Block, BlockBody, lineFeed, Img } from "verstak"
import { Markdown } from "verstak-markdown"
import { Icon, Field, createFieldModel, $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { $app } from "models/App"

export function ToolBar(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(body, {
      render(b) {
        const app = $app.value
        const theme = $theme.value as AppTheme
        // Image({ // logo
        //   initialize(b, base) {
        //     base()
        //     b.contentAlignment = Align.Stretch
        //     b.frameAlignment = Align.Stretch
        //     b.model.source = "https://nezaboodka.com/img/star-768x768-circle.png"
        //     b.native.className = cx(s.Panel, s.Clickable, s.Logo)
        //     b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
        //   },
        //   render(b, base) {
        //     base()
        //     b.native.style.backgroundColor = app.blinkingEffect ? "red" : ""
        //   }
        // })
        Block({ // Logo
          initialize(b) {
            b.style(theme.panel)
            // b.style(s.Clickable)
            // b.style(s.Logo)
            b.native.style.outlineOffset = "-1px"
            // b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          render(b) {
            b.native.style.boxShadow = app.blinkingEffect ? "0.025rem 0.025rem 0.35rem 0 red" : ""
            Img({
              render(b, base) {
                base()
                b.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              }
            })
          }
        })
        Block({
          render(b) {
            b.widthGrowth = 1
            b.style(theme.panel)
            Block({
              render(b) {
                b.widthGrowth = 1
                Markdown(`**Verstak** v${app.version}`)
                lineFeed()
                Markdown("Try to *change* window size")
              }
            })
            Field({
              initialize(b, base) {
                const loader = app.loader
                b.minWidth = "7em"
                b.model = createFieldModel({
                  icon: "fa-solid fa-search",
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                base()
              },
            })
          }
        })
        Block({ // Account
          initialize(b) {
            // b.native.onclick = () => Transaction.run(null, () => app.nextTheme())
          },
          render(b) {
            b.style(theme.panel)
            // b.style(s.Hint)
            // b.style(s.Clickable)
            Icon("fa-solid fa-bars")
          }
        })
      }},
    )
  )
}
