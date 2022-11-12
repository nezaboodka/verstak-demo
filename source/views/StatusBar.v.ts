import { Block, BlockArgs, To, use } from "verstak"
import { Toggle, ToggleModel } from "components/Toggle.v"
import { compose, refs } from "common/Utils"
import { Panel } from "./Panel.v"
import * as s from "themes/Common.s"
import { App } from "models/App"
import { Ref } from "reactronic"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      wrapping: true,
      render(e, b) {
        const app = use(App)
        Block<ToggleModel>("Status", {
          widthGrowth: 1,
          alignContent: To.Center,
          initialize(e, b) {
            b.model = compose({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
            })
            e.className = s.Panel
          },
          render(e, b) {
            Toggle("DebugMode", b.model)
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
