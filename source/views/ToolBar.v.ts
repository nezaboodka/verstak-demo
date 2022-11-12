import { cx } from "@emotion/css"
import { Transaction } from "reactronic"
import { Block, BlockArgs, PlainText, lineFeed, To, Img, use } from "verstak"
import { Panel } from "./Panel.v"
import { App } from "models/App"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import * as s from "themes/Common.s"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
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

        Panel(`Verstak ${app.version}`, {
          widthGrowth: 1,
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          override(e, b) {
            b.render()
            lineFeed(); PlainText("Try to change window size")
          }
        })

        Block("Account", {
          initialize(e, b) {
            e.className = cx(s.Panel, s.Hint, s.Clickable)
            e.onclick = () => Transaction.run(null, () => app.theme = new MarkdownCodeDarkTheme())
          },
          render(e, b) {
            PlainText("[=]")
          }
        })
      }
    })
  )
}
