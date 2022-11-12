import { Block, BlockArgs, To } from "verstak"
import { Toggle } from "components/Toggle.v"
import { oo } from "common/Utils"
import { Panel } from "./Panel.v"
import * as s from "themes/Common.s"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      wrapping: true,
      render(e, b) {
        Block("Status", {
          widthGrowth: 1,
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            Toggle("DebugMode", oo({ label: "Blinking Rendering", checked: false }))
          }
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
