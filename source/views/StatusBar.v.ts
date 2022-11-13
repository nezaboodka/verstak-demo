import { refs } from "reactronic"
import { Block, BlockArgs, use, asComponent, To } from "verstak"
import { observableModel } from "common/Utils"
import { Toggle } from "components/Toggle.v"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"
import { createFieldModel, Field } from "components/Field.v"

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      wrapping: true,
      render(e, b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = use(App)
        const theme = use(Theme)

        Toggle("BlinkMode", {
          initialize(e, b, base) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
              color: refs(theme).toggleColor,
            })
            base()
          },
          render(e, b, base) {
            base()
            // Style is not inside "initialize", because of theming
            e.classList.toggle(s.Panel, true)
          }
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

        Block("Spacing", {
          widthGrowth: 1,
          alignContent: To.Right,
          render(e, b) {
            e.className = s.Panel
            Field("Dropdown1", {
              widthMin: "7em",
              initialize(e, b, base) {
                const loader = app.loader
                b.model = createFieldModel({
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                base()
              },
              render(e, b, base) {
                base()
              },
            })
          },
        })

      },
    }))
  )
}
