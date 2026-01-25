import { refs } from "reactronic"
import { Block, Horizontal, Button, Toggle, Input, composeInputModel, Theme, rxModel } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"

export function statusBar() {
  // We get app and theme as a context variables
  // (instead of functional parameters) in order
  // to avoid passing app/theme in each and every
  // node through update of a tree.
  const app = DemoApp.current
  const theme = Theme.current as AppTheme
  Toggle({ key: "Blinking",
    preparation(el, base) {
      // We compose model from different pieces,
      // such as app and theme. Without the need
      // to implement interface in form of class.
      this.model = rxModel({
        label: "Blinking Rendering",
        checked: refs(app).isBlinkingEffectOn,
      })
      base()
    },
    body(el, base) {
      base()
      // Style is not inside "initialize", because of theming
      this.native.classList.toggle(theme.panel, true)
    }
  })
  Button({ key: "Theme",
    preparation(el, base) {
      this.model = rxModel({
        icon: "fa-solid fa-palette",
        label: "Switch Theme",
        action() { app.nextTheme() }
      })
      base()
    },
    body(el,  base) {
      base()
      this.useStylingPreset(theme.panel)
    }
  })
  Toggle({ key: "SecondaryTimeZone",
    preparation(el, base) {
      this.model = rxModel({
        label: "New York (GMT-7)",
        checked: refs(app).isSecondaryTimeZoneOn,
      })
      base()
    },
    body(el, base) {
      base()
      this.native.classList.toggle(theme.panel, true)
    }
  })
  Toggle({
    body(el, base) {
      base()
      this.native.classList.toggle(theme.panel, true)
    }
  })
  Block({
    body() {
      this.useStylingPreset(theme.panel)
      this.horizontally = Horizontal.stretch
      this.contentHorizontally = Horizontal.right
      Input({
        preparation(el, base) {
          const loader = app.loader
          this.width = { min: "10em" }
          this.model = composeInputModel({
            icon: "fa-solid fa-search",
            text: refs(loader).filter,
            options: refs(loader).loaded,
            isHotText: true,
            isMultiLineText: false,
          })
          base()
        },
        body(el, base) {
          base()
          // Spinner("Spinner", {
          //   preparation() {
          //     this.model = observableModel({
          //       active: refs(app.loader.indicator).isActive,
          //       color: "red",
          //     })
          //   },
          // })
        }
      })
    }
  })
}
