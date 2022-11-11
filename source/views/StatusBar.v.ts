import { Block, BlockArgs, To, PlainText, lineFeed } from "verstak"
import { Panel } from "./Panel.v"
import * as m from "theme/Common.m"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, {
      ...args,
      render(e, b) {
        Panel("Status Line", {
          widthGrowth: 1,
          align: To.Center,
          dock: To.Bottom,
          render(e, b) {
            b.baseRender()
            b.apply(m.Panel)
            lineFeed()
            PlainText("one more status line")
          }
        })

        Panel("[1]", {
          render(e, b) {
            b.baseRender()
            b.apply(m.Panel, m.Center)
          }
        })

        Panel("[2]", {
          render(e, b) {
            b.baseRender()
            b.apply(m.Panel, m.Center)
          }
        })

        Panel("[3]", {
          render(e, b) {
            b.baseRender()
            b.apply(m.Panel, m.Center)
          }
        })
      }
    })
  )
}
