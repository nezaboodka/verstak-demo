import { refs } from "reactronic"
import { Section, RxNodeDecl, Align, El } from "verstak"
import { Button, Toggle, Field, composeFieldModel, Theme } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { observableModel } from "common/Utils.js"
import { App } from "models/App.js"

export function StatusBar(decl?: RxNodeDecl<El<HTMLElement, void, void>>) {
  return (
    Section(decl, {
      update(b) {
        // We get app and theme as a context variables
        // (instead of functional parameters) in order
        // to avoid passing app/theme in each and every
        // node through update of a tree.
        const app = App.actual
        const theme = Theme.actual as AppTheme
        b.contentWrapping = true
        Toggle({ key: "Blinking",
          initialize(b, base) {
            // We compose model from different pieces,
            // such as app and theme. Without the need
            // to implement interface in form of class.
            b.model = observableModel({
              label: "Blinking Rendering",
              checked: refs(app).isBlinkingEffectOn,
            })
            base()
          },
          update(b, base) {
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
          update(b,  base) {
            base()
            b.useStyle(theme.panel)
          }
        })
        Toggle({ key: "SecondaryTimeZone",
          initialize(b, base) {
            b.model = observableModel({
              label: "New York (GMT-7)",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          update(b, base) {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Toggle({
          update(b, base) {
            base()
            b.native.classList.toggle(theme.panel, true)
          }
        })
        Section({
          update(b) {
            b.useStyle(theme.panel)
            b.widthGrowth = 1
            b.contentAlignment = Align.ToRight
            Field({
              initialize(b, base) {
                const loader = app.loader
                b.minWidth = "10em"
                b.model = composeFieldModel({
                  icon: "fa-solid fa-search",
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                base()
              },
              update(b, base) {
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
