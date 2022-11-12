import { cx } from "@emotion/css"
import { Block, BlockArgs, PlainText, lineFeed, To, Img, useContext } from "verstak"
import { Panel } from "./Panel.v"
import { App } from "models/App"
import * as s from "theme/Common.s"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      render(e, b) {

        Block("Logo", {
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            e.style.backgroundColor = "white"
            e.style.padding = "0.5rem"
            e.style.borderRadius = "100%"
            Img("N*", {
              render(e, b) {
                e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
                e.style.width = "2.5em"
                e.style.height = "2.5em"
              }
            })
          }
        })

        const app = useContext(App)
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
            e.className = cx(s.Panel, s.Hint)
          },
          render(e, b) {
            PlainText("[=]")
          }
        })
      }
    })
  )
}
