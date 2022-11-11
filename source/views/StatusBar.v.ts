import { Block, BlockArgs, To, PlainText, lineFeed } from "verstak"
import { Panel } from "./Panel.v"
import * as z from "theme/Common.z"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, {
      ...args,
      render(e, b) {
        Panel("Status Line", {
          widthGrowth: 1,
          alignContent: To.Center,
          alignFrame: To.Bottom,
          initialize: z.Panel,
          render(e, b) {
            b.baseRender()
            lineFeed()
            PlainText("one more status line")
          }
        })

        Panel("[1]", {
          initialize: [z.Panel, z.Center],
          render(e, b) {
            b.baseRender()
          }
        })

        Panel("[2]", {
          initialize: [z.Panel, z.Center],
          render(e, b) {
            b.baseRender()
          }
        })

        Panel("[3]", {
          initialize: [z.Panel, z.Center],
          render(e, b) {
            b.baseRender()
          }
        })
      }
    })
  )
}
