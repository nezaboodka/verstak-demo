import { Block, BlockArgs, To } from "verstak"
import { Panel } from "./Panel.v"
import * as s from "theme/Common.s"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      render(e, b) {
        Panel("Status Line", {
          widthGrowth: 1,
          alignContent: To.Center,
          alignFrame: To.Bottom,
          initialize(e, b) {
            e.className = s.Panel
          },
        })

        Panel("[1]", {
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          override(e, b) {
            b.render()
          }
        })

        Panel("[2]", {
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          override(e, b) {
            b.render()
          }
        })

        Panel("[3]", {
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          override(e, b) {
            b.render()
          }
        })
      }
    })
  )
}
