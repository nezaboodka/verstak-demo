import { refs, RxNodeDecl } from "reactronic"
import { Section, Align, El } from "verstak"
import { Button, Toggle, Field, composeFieldModel, Theme, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function StatusBar(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Section(declaration, {
      formula: b => {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through update of a tree.
        const app = App.actual
        const theme = Theme.actual as AppTheme
        b.contentWrapping = true
        Toggle({ key: "Blinking",
          activation(b, base) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).isBlinkingEffectOn,
            })
            base()
          },
          formula: (b, base) => {
            base()
            // Style is not inside "initialize", because of theming
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Button({ key: "Theme",
          activation(b, base) {
            b.model = observableModel({
              icon: "fa-solid fa-palette",
              label: "Switch Theme",
              action() { app.nextTheme() }
            })
            base()
          },
          formula: (b,  base) => {
            base()
            b.useStylingPreset(theme.panel)
          }
        })
        Toggle({ key: "SecondaryTimeZone",
          activation(b, base) {
            b.model = observableModel({
              label: "New York (GMT-7)",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          formula: (b, base) => {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Toggle({
          formula: (b, base) => {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Section({
          formula: b => {
            b.useStylingPreset(theme.panel)
            b.widthMerelyGrowth = 1
            b.contentAlignment = Align.right
            Field({
              activation(b, base) {
                const loader = app.loader
                b.widthMerelyMin = "10em"
                b.model = composeFieldModel({
                  icon: "fa-solid fa-search",
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                base()
              },
              formula: (b, base) => {
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
