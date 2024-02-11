import { refs, Mode } from "reactronic"
import { Section, Align, Note, startNewRow } from "verstak"
import { Markdown } from "verstak-markdown"
import { composeFieldModel, Field, Theme } from "verstak-express"
import { App } from "models/App.js"
import { ToolBar } from "./ToolBar.v.js"
import { StatusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.independentUpdate,
      initialize(b) {
        b.native.sensors.focus // enable focus global manager
      },
      update(b) {
        const app = App.actual
        const theme = app.theme
        Theme.actual = theme

        b.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        b.widthMerelyGrowth = 1
        b.heightMerelyGrowth = 1

        ToolBar({
          update(b, base) {
            b.widthMerelyGrowth = 1
            base()
          }
        })

        startNewRow()
        Section({
          update(b) {
            b.useStylingPreset(app.theme.panel)
            b.widthMerelyMin = "10rem"
            b.contentAlignment = Align.top
            b.boundsAlignment = Align.stretch
            Note("Navigation Bar")

            startNewRow()
            Field({
              initialize(b, base) {
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
            })

            startNewRow()
            Section({
              update(b) {
                b.heightMerelyGrowth = 1
              }
            })

            startNewRow()
            Field({
              initialize(b, base) {
                const loader = app.loader
                b.widthMerelyMin = "10em"
                b.model = composeFieldModel({
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                  isMultiLineText: false,
                })
                base()
              },
            })
          }
        })
        WorkArea({
          update(b, base) {
            base()
            b.useStylingPreset(theme.panel)
            b.useStylingPreset(theme.accent)
            b.widthMerelyGrowth = 3
            b.heightMerelyGrowth = 1
          }
        })
        Section({
          mode: Mode.independentUpdate,
          triggers: { theme },
          update(b) {
            b.useStylingPreset(theme.panel)
            b.useStylingPreset(theme.markdown)
            b.width = { min: "16rem", growth: 2 }
            b.contentAlignment = Align.left + Align.top,
            b.boundsAlignment = Align.stretch,
            Markdown(EXAMPLE_CODE)
          }
        })

        startNewRow()
        StatusBar({
          update(b, base) {
            base()
            b.widthMerelyGrowth = 1
          }
        })
      },
    })
  )
}

const EXAMPLE_CODE = `
Element size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user.

\`\`\` js
Table("Example", {
  update(b) {
    // Elements can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Align.left + Align.centerY)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Align.centerX + Align.top)
    Ruler("B", Align.centerX + Align.top)
    Ruler("C", Align.centerX + Align.top)
    startNewRow(); Ruler("2", Align.left + Align.centerY)
    startNewRow(); Ruler("3", Align.left + Align.centerY)
    // Elements can also be layed out
    // explicitly in exact cells.
    ExampleData("B2")
    ExampleData("A1:B1")
    ExampleData("C1:C2")
    ExampleData("B3:C3")
    ExampleData("A2:A3")
  },
})
\`\`\`
`
