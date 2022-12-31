import { refs } from "reactronic"
import { Block, BlockBody, Align } from "verstak"
import { Button, Toggle, Field, createFieldModel, $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { observableModel } from "common/Utils"
import { $app } from "models/App"

export function StatusBar(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(body, {
      render(b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = $app.value
        const theme = $theme.value as AppTheme
        b.contentWrapping = true
        Toggle({ key: "Blinking",
          initialize(b, base) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
            })
            base()
          },
          render(b, base) {
            base()
            // Style is not inside "initialize", because of theming
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Button({ key: "Theme",
          initialize(b, base) {
            b.model = observableModel({
              icon: "fa-solid fa-palette",
              label: "Switch Theme",
              action() { app.nextTheme() }
            })
            base()
          },
          render(b,  base) {
            base()
            b.style(theme.panel)
          }
        })
        Toggle({
          render(b, base) {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Toggle({
          render(b, base) {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Block({
          render(b) {
            b.style(theme.panel)
            b.widthGrowth = 1
            b.contentAlignment = Align.Right
            Field({
              initialize(b, base) {
                const loader = app.loader
                b.minWidth = "10em"
                b.model = createFieldModel({
                  icon: "fa-solid fa-search",
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
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
          }
        })
      }},
    )
  )
}
