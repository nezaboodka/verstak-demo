import { refs, RxNodeDecl } from "reactronic"
import { Section, Align, El } from "verstak"
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
    onCreate: (el, base) => {
      // We compose model from different pieces,
      // such as app and theme. Without the need
      // to implement interface in form of class.
      el.model = observableModel({
        label: "Blinking Rendering",
        checked: refs(app).isBlinkingEffectOn,
      })
      base()
    },
    onChange: (el, base) => {
      base()
      // Style is not inside "initialize", because of theming
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Button({ key: "Theme",
    onCreate: (el, base) => {
      el.model = observableModel({
        icon: "fa-solid fa-palette",
        label: "Switch Theme",
        action() { app.nextTheme() }
      })
      base()
    },
    onChange: (el,  base) => {
      base()
      el.useStylingPreset(theme.panel)
    }
  })
  Toggle({ key: "SecondaryTimeZone",
    onCreate: (el, base) => {
      el.model = observableModel({
        label: "New York (GMT-7)",
        checked: refs(app).isSecondaryTimeZoneOn,
      })
      base()
    },
    onChange: (el, base) => {
      base()
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Toggle({
    onChange: (el, base) => {
      base()
      el.native.classList.toggle(theme.panel, true)
    }
  })
  Section({
    onChange: el => {
      el.useStylingPreset(theme.panel)
      el.alignment = Align.stretchWidth
      el.extraAlignment = Align.right
      Field({
        onCreate: (el, base) => {
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
        onChange: (el, base) => {
          base()
          // Spinner("Spinner", {
          //   onCreate: el => {
          //     el.model = observableModel({
          //       active: refs(app.loader.monitor).isActive,
          //       color: "red",
          //     })
          //   },
          // })
        }
      })
    }
  })
}
