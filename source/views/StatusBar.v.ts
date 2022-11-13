import { refs } from "reactronic"
import { Block, BlockArgs, use, asComponent } from "verstak"
import { Toggle } from "components/Toggle.v"
import { observableModel } from "common/Utils"
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
            base()
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
              color: refs(theme).toggleColor,
            })
          },
          render(e, b, base) {
            base()
            // Style is not inside "initialize", because of theming
            e.classList.toggle(s.Panel, true)
          }
        })

        Dropdown("Dropdown1", {
          widthGrowth: 1,
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
          },
        })

        Toggle("A", {
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
          }
        })

        Toggle("B", {
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
          }
        })

        Toggle("C", {
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
          }
        })
      },
    }))
  )
}
