import { refs } from "reactronic"
import { Block, BlockBody, use, asBaseFor, Align } from "verstak"
import { observableModel } from "common/Utils"
import { Toggle } from "components/Toggle.v"
import { createFieldModel, Field } from "components/Field.v"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"

export function StatusBar(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(asBaseFor(body, {
      render(b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = use(App)
        const theme = use(Theme)
        b.contentWrapping = true
        Toggle({
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
        Toggle((b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Toggle((b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Toggle((b, base) => {
          base()
          b.native.classList.toggle(s.Panel, true)
        })
        Block(b => {
          b.widthGrowth = 1
          b.contentAlignment = Align.Right
          b.native.className = s.Panel
          Field({
            initialize(b, base) {
              const loader = app.loader
              b.model = createFieldModel({
                text: refs(loader).filter,
                options: refs(loader).loaded,
                isHotText: true,
                isMultiLineText: false,
              })
              b.minWidth = "15em"
              base()
            },
            render(b, base) {
              base()
              // Spinner("Spinner", {
              //   initialize(b) {
              //     b.model = observableModel({
              //       active: refs(app.loader.monitor).isActive,
              //       color: "red",
              //     })
              //   },
              // })
            }
          })
        })
      },
    }))
  )
}
