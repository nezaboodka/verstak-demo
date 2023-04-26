import { refs } from "reactronic"
import { Band, BlockBuilder, Align } from "verstak"
import { Button, Toggle, Field, createFieldModel, $theme } from "snasti"
import { AppTheme } from "themes/AppTheme"
import { observableModel } from "common/Utils"
import { $app } from "models/App"

export function StatusBar(builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Band(builder, {
      render(b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through rendering tree.
        const app = $app.value
        const theme = $theme.value as AppTheme
        b.contentWrapping = true
        Toggle({ key: "Blinking",
          initialize(b, original) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).blinkingEffect,
            })
            original()
          },
          render(b, original) {
            original()
            // Style is not inside "initialize", because of theming
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Button({ key: "Theme",
          initialize(b, original) {
            b.model = observableModel({
              icon: "fa-solid fa-palette",
              label: "Switch Theme",
              action() { app.nextTheme() }
            })
            original()
          },
          render(b,  original) {
            original()
            b.style(theme.panel)
          }
        })
        Toggle({ key: "SecondaryTimeZone",
          initialize(b, original) {
            b.model = observableModel({
              label: "New York (GMT-7)",
              checked: refs(app).secondaryTimeZone,
            })
            original()
          },
          render(b, original) {
            original()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Toggle({
          render(b, original) {
            original()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Band({
          render(b) {
            b.style(theme.panel)
            b.widthGrowth = 1
            b.contentAlignment = Align.Right
            Field({
              initialize(b, original) {
                const loader = app.loader
                b.minWidth = "10em"
                b.model = createFieldModel({
                  icon: "fa-solid fa-search",
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                original()
              },
              render(b, original) {
                original()
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
