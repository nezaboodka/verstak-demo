import { refs } from "reactronic"
import { Panel, PosH, PosV } from "verstak"
import { Button, Toggle, Field, composeFieldModel, Theme, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

export function statusBar() {
  // We get app and theme as a context variables
  // (instead of functional parameters) in order
  // to avoid passing app/theme in each and every
  // node through update of a tree.
  const app = App.current
  const theme = Theme.current as AppTheme
  Toggle({ key: "Blinking",
    creation: (el, base) => {
      // We compose model from different pieces,
      // such as app and theme. Without the need
      // to implement interface in form of class.
      el.model = observableModel({
        label: "Blinking Rendering",
        checked: refs(app).isBlinkingEffectOn,
      })
      base()
    },
    script: (el, base) => {
      base()
      // Style is not inside "initialize", because of theming
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Button({ key: "Theme",
    creation: (el, base) => {
      el.model = observableModel({
        icon: "fa-solid fa-palette",
        label: "Switch Theme",
        action() { app.nextTheme() }
      })
      base()
    },
    script: (el,  base) => {
      base()
      el.useStylingPreset(theme.panel)
    }
  })
  Toggle({ key: "SecondaryTimeZone",
    creation: (el, base) => {
      el.model = observableModel({
        label: "New York (GMT-7)",
        checked: refs(app).isSecondaryTimeZoneOn,
      })
      base()
    },
    script: (el, base) => {
      base()
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Toggle({
    script: (el, base) => {
      base()
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Panel({
    script: el => {
      el.useStylingPreset(theme.panel)
      el.horizontal = PosH.stretch
      el.contentHorizontal = PosH.right
      Field({
        creation: (el, base) => {
          const loader = app.loader
          el.width = { min: "10em" }
          el.model = composeFieldModel({
            icon: "fa-solid fa-search",
            text: refs(loader).filter,
            options: refs(loader).loaded,
            isHotText: true,
            isMultiLineText: false,
          })
          base()
        },
        script: (el, base) => {
          base()
          // Spinner("Spinner", {
          //   creation: el => {
          //     el.model = observableModel({
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
