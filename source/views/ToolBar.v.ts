import { cx } from "@emotion/css"
import { refs, Transaction } from "reactronic"
import { Block, BlockBody, PlainText, lineFeed, Img, useContext, asBaseFor, HtmlText, Align } from "verstak"
import { Icon } from "components/Icon.v"
import { createFieldModel, Field } from "components/Field.v"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import { App } from "models/App"
import * as s from "themes/Common.s"

export function ToolBar(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(asBaseFor(body, {
      render(b) {
        const app = useContext(App)
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
            b.native.className = cx(s.Panel, s.Clickable, s.Logo)
            b.native.style.outlineOffset = "-1px"
            b.native.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          render(b) {
            b.native.style.boxShadow = app.blinkingEffect ? "0.025rem 0.025rem 0.35rem 0 red" : ""
            Img(b => {
              b.native.src = "https://nezaboodka.com/img/star-768x768-circle.png"
            })
          }
        })
        Block(b => {
          b.widthGrowth = 1
          b.native.classList.toggle(s.Panel, true)
          Block(b => {
            b.widthGrowth = 1
            HtmlText(`<b>Verstak</b> v${app.version}`)
            lineFeed()
            PlainText("Try to change window size")
          })
          Field({
            initialize(b, base) {
              const loader = app.loader
              b.model = createFieldModel({
                text: refs(loader).filter,
                options: refs(loader).loaded,
                isHotText: true,
                isMultiLineText: false,
              })
              b.minWidth = "7em"
              base()
            },
          })
        })
        Block({ // Account
          initialize(b) {
            b.native.onclick = () => Transaction.run(null, () => app.nextTheme())
          },
          render(b) {
            b.native.className = cx(s.Panel, s.Hint, s.Clickable)
            Icon("fa-solid fa-bars")
          }
        })
      },
    }))
  )
}
