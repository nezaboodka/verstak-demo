import { cx } from "@emotion/css"
import { refs, Transaction } from "reactronic"
import { Block, BlockArgs, PlainText, lineFeed, Align, Img, use, asComponent, HtmlText } from "verstak"
import { Icon } from "components/Icon.v"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import { App } from "models/App"
import * as s from "themes/Common.s"
import { createFieldModel, Field } from "components/Field.v"

export function ToolBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e, b) {
        const app = use(App)
        Block("Logo", {
          initialize(e, b) {
            e.className = cx(s.Panel, s.Clickable, s.Logo)
            e.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          render(e, b) {
            e.style.backgroundColor = app.blinkingEffect ? "red" : ""
            Img("N*", {
              render(e, b) {
                e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              }
            })
          }
        })
        Block(`Verstak ${app.version}`, {
          widthGrowth: 1,
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
            Block("Welcome", {
              widthGrowth: 1,
              render(e, b) {
                HtmlText(`<b>Verstak</b> v${app.version}`)
                lineFeed()
                PlainText("Try to change window size")
              },
            })
            Field("Dropdown1", {
              widthMin: "7em",
              initialize(e, b, base) {
                const loader = app.loader
                b.model = createFieldModel({
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
        Block("Account", {
          initialize(e, b) {
            e.onclick = () => Transaction.run(null, () => app.theme = new MarkdownCodeDarkTheme())
          },
          render(e, b) {
            e.className = cx(s.Panel, s.Hint, s.Clickable)
            Icon("fa-solid fa-bars")
          }
        })
      },
    }))
  )
}
