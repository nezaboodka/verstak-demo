import { Block, BlockArgs, To, Plain, lineFeed } from "verstak"
import { Panel } from "./Panel.v"
import * as m from "theme/Common.m"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, {
      ...args,
      render(e, b) {
        Panel("Status", {
          mixins: [m.Panel],
          widthGrab: 1,
          align: To.Center,
          dock: To.Bottom,
          render(e, b) {
            b.baseRender()
            lineFeed()
            Plain("status bar content")
          }
        })

        Panel("[1]", {
          mixins: [m.Panel, m.Center],
          render(e, b) {
            b.baseRender()
          }
        })

        Panel("[2]", {
          mixins: [m.Panel, m.Center],
          render(e, b) {
            b.baseRender()
          }
        })

        Panel("[3]", {
          mixins: [m.Panel, m.Center],
          render(e, b) {
            b.baseRender()
          }
        })
      }
    })
  )
}
