import { refs } from "reactronic"
import { Block, BlockArgs, To, use, asComponent } from "verstak"
import { Toggle, ToggleModel } from "components/Toggle.v"
import { composeModel } from "common/Utils"
import { Panel } from "./Panel.v"
import { Dropdown } from "components/Dropdown.v"
import { App } from "models/App"
import { Theme } from "themes/Theme"
import * as s from "themes/Common.s"

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      flowWrap: true,
      render(e, b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = use(App)
        const theme = use(Theme)

        Toggle("BlinkMode", {
          initialize(e, b, base) {
            base?.(e, b)
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = composeModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
              color: refs(theme).toggleColor,
            })
          },
          render(e, b, base) {
            base?.(e, b)
            // Style is not inside "initialize", because of theming
            e.classList.toggle(s.Panel, true)
          }
        })

        Block<ToggleModel>("DropdownExample", {
          widthGrowth: 1,
          render(e, b) {
            e.className = s.Panel
            Dropdown("Dropdown1")
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
      },
    }))
  )
}
