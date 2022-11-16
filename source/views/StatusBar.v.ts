import { refs } from "reactronic"
import { Block, BlockBody, use, baseFor, Align } from "verstak"
import { observableModel } from "common/Utils"
import { Toggle } from "components/Toggle.v"
import { createFieldModel, Field } from "components/Field.v"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"

export function StatusBar(name: string, body: BlockBody<HTMLElement, void, void>) {
  return (
    Block(name, baseFor(body, {
      render(b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = use(App)
        const theme = use(Theme)
        b.wrapContent = true
        Toggle("BlinkMode", {
          initialize(b, base) {
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
          render(b, base) {
            base()
            // Style is not inside "initialize", because of theming
            b.native.classList.toggle(s.Panel, true)
          }
        })
        Toggle("A", (b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Toggle("B", (b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Toggle("C", (b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Block("Fields", b => {
          b.widthGrowth = 1
          b.alignContent = Align.Right
          b.native.className = s.Panel
          Field("Dropdown1", {
            initialize(b, base) {
              const loader = app.loader
              b.model = createFieldModel({
                text: refs(loader).filter,
                options: refs(loader).loaded,
                isHotText: true,
                isMultiLineText: false,
              })
              b.widthMin = "15em"
              base()
            },
          })
        })
      },
    }))
  )
}
