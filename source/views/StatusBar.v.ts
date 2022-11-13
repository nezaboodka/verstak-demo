import { refs } from "reactronic"
import { Block, BlockArgs, To, use } from "verstak"
import { Toggle, ToggleModel } from "components/Toggle.v"
import { composeModel } from "common/Utils"
import { Panel } from "./Panel.v"
import { App } from "models/App"
import { Theme } from "themes/Theme"
import * as s from "themes/Common.s"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      flowWrap: true,
      render(e, b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = use(App)
        const theme = use(Theme)

        Block<ToggleModel>("BlinkMode", {
          initialize(e, b) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = composeModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
              color: refs(theme).toggleColor,
            })
          },
          render(e, b) {
            // Style is not inside "initialize", because of theming
            e.className = s.Panel
            Toggle("DebugMode", b.model)
          }
        })

        Block<ToggleModel>("Spacer", {
          widthGrowth: 1,
          alignContent: To.Center,
          render(e, b) {
            e.className = s.Panel
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
