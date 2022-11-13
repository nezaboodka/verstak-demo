import { cx } from "@emotion/css"
import { refs, Transaction } from "reactronic"
import { Block, BlockArgs, PlainText, lineFeed, To, Img, use, asComponent, HtmlText } from "verstak"
import { Icon } from "components/Icon.v"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import { App } from "models/App"
import { Panel } from "./Panel.v"
import * as s from "themes/Common.s"
import { createFieldModel, Field } from "components/Field.v"

export function ToolBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e, b) {
        const app = use(App)

        Block("Logo", {
          initialize(e, b) {
            e.className = cx(s.Panel, s.Clickable)
            e.onclick = () => Transaction.run(null, () => app.blinkingEffect = !app.blinkingEffect)
          },
          render(e, b) {
            e.style.backgroundColor = "white"
            e.style.padding = "0.5rem"
            e.style.borderRadius = "100%"
            e.style.backgroundColor = app.blinkingEffect ? "red" : ""
            Img("N*", {
              render(e, b) {
                e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
                e.style.width = "2.5em"
                e.style.height = "2.5em"
              }
            })
          }
        })

        Block(`Verstak ${app.version}`, {
          widthGrowth: 1,
          initialize(e, b) {
            e.className = s.Panel
          },
          override(e, b) {
            b.render()
            Block("Welcome", {
              widthGrowth: 1,
              render(e, b) {
                HtmlText(`<b>Verstak</b> v${app.version}`)
                lineFeed(); PlainText("Try to change window size")
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
              render(e, b, base) {
                base()
              },
            })
          }
        })

        Block("Account", {
          initialize(e, b) {
            e.className = cx(s.Panel, s.Hint, s.Clickable)
            e.onclick = () => Transaction.run(null, () => app.theme = new MarkdownCodeDarkTheme())
          },
          render(e, b) {
            Icon("fa-solid fa-bars")
          }
        })
      },
    }))
  )
}
