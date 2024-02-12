import { refs, Mode } from "reactronic"
import { Section, Align, Note, startNewRow } from "verstak"
import { Markdown, Field, Theme, composeFieldModel } from "verstak-express"
import { App } from "models/App.js"
import { ToolBar } from "./ToolBar.v.js"
import { StatusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.independentUpdate,
      activation: el => {
        el.native.sensors.focus // enable focus global manager
      },
      formula: el => {
        const app = App.current
        const theme = app.theme
        Theme.current = theme

        el.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        el.widthMerelyGrowth = 1
        el.heightMerelyGrowth = 1

        ToolBar({
          formula: (el, base) => {
            el.widthMerelyGrowth = 1
            base()
          }
        })

        startNewRow()
        Section({
          formula: el => {
            el.useStylingPreset(app.theme.panel)
            el.widthMerelyMin = "10rem"
            el.contentAlignment = Align.top
            el.boundsAlignment = Align.stretch
            Note("Navigation Bar")

            startNewRow()
            Field({
              activation: (el, base) => {
                const loader = app.loader
                el.widthMerelyMin = "10em"
                el.model = composeFieldModel({
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
              formula: el => {
                el.heightMerelyGrowth = 1
              }
            })

            startNewRow()
            Field({
              activation: (el, base) => {
                const loader = app.loader
                el.widthMerelyMin = "10em"
                el.model = composeFieldModel({
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
          formula: (el, base) => {
            base()
            el.useStylingPreset(theme.panel)
            el.useStylingPreset(theme.accent)
            el.widthMerelyGrowth = 3
            el.heightMerelyGrowth = 1
          }
        })
        Section({
          mode: Mode.independentUpdate,
          triggers: { theme },
          formula: el => {
            el.useStylingPreset(theme.panel)
            el.useStylingPreset(theme.markdown)
            el.width = { min: "16rem", growth: 2 }
            el.contentAlignment = Align.left + Align.top,
            el.boundsAlignment = Align.stretch,
            Markdown(EXAMPLE_CODE)
          }
        })

        startNewRow()
        StatusBar({
          formula: (el, base) => {
            base()
            el.widthMerelyGrowth = 1
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
