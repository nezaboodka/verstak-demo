import { Block, BlockArgs, Align, Plain, lineFeed } from "verstak"
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
          docking: Align.Bottom,
          render(e, b) {
            b.baseRender()
            lineFeed()
            Plain("status bar content")
          }
        })

        Panel("Ind-1", {
          mixins: [m.Panel, m.Center],
          docking: Align.Bottom,
          render(e, b) {
            b.baseRender()
            lineFeed()
            Plain("[1]")
          }
        })

        Panel("Ind-2", {
          mixins: [m.Panel, m.Center],
          docking: Align.Bottom,
          render(e, b) {
            b.baseRender()
            Plain("[2]")
          }
        })

        Panel("Ind-3", {
          mixins: [m.Panel, m.Center],
          docking: Align.Bottom,
          render(e, b) {
            b.baseRender()
            Plain("[3]")
          }
        })
      }
    })
  )
}
