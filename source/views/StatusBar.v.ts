import { refs } from "reactronic"
import { Block, BlockBody, useContext, Align, vmt } from "verstak"
import { Button, Toggle, Field, createFieldModel } from "gost-pi-22"
import { observableModel } from "common/Utils"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"

export const StatusBar = (body?: BlockBody<HTMLElement, void, void>) => (
  Block({ ...vmt(body), base: {
    render(b) {
      // We get app and theme as a context variables
      // (instead of functional parameters) in order
      // to avoid passing app/theme in each and every
      // node through rendering tree.
      const app = useContext(App)
      const theme = useContext(Theme)
      b.contentWrapping = true
      Toggle({ key: "Blinking",
        initialize(b) {
          // We compose model from different pieces,
          // such as app and theme. Without the need
          // to implement interface in form of class.
          b.model = observableModel({
            label: "Blinking Rendering",
            checked: refs(app).blinkingEffect,
            color: refs(theme).toggleColor,
          })
        },
        render(b) {
          // Style is not inside "initialize", because of theming
          b.native.classList.toggle(s.Panel, true)
        }
      })
      Button({ key: "Theme",
        initialize(b) {
          b.model = observableModel({
            icon: "fa-solid fa-palette",
            label: "Switch Theme",
            action() { app.nextTheme() }
          })
        },
        render(b) {
          b.native.classList.toggle(s.Panel, true)
        }
      })
      Toggle(b => {
        b.native.classList.toggle(s.Panel, true)
      })
      Toggle(b =>{
        b.native.classList.toggle(s.Panel, true)
      })
      Block(b => {
        b.widthGrowth = 1
        b.contentAlignment = Align.Right
        b.native.className = s.Panel
        Field({
          initialize(b) {
            const loader = app.loader
            b.minWidth = "10em"
            b.model = createFieldModel({
              icon: "fa-solid fa-search",
              text: refs(loader).filter,
              options: refs(loader).loaded,
              isHotText: true,
              isMultiLineText: false,
            })
          },
          render(b) {
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
    }},
  })
)
