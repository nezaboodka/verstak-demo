import { refs, Mode } from "reactronic"
import { Section, Align, Note, startNewRow, SplitView } from "verstak"
import { Markdown, Field, Theme, composeFieldModel } from "verstak-express"
import { App } from "models/App.js"
import { ToolBar } from "./ToolBar.v.js"
import { StatusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.independentUpdate,
      onCreate: el => {
        el.native.sensors.focus // enable focus global manager
        el.native.style.overflow = "hidden"
      },
      onChange: el => {
        const app = App.current
        const theme = app.theme
        Theme.current = theme

        el.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        el.widthJustGrowth = 1
        el.heightJustGrowth = 1

        ToolBar({
          onChange: (el, base) => {
            el.widthJustGrowth = 1
            base()
          }
        })

        startNewRow()
        Section({
          onCreate: el => {
            el.splitView = SplitView.horizontal
            el.widthJustGrowth = 1
            el.heightJustGrowth = 1
          },
          onChange: el => {
            Section({ // partition (nav-bar)
              onChange: el => {
                el.widthJustMin = "150px"
                el.heightJustGrowth = 1
                Section({
                  onChange: el => {
                    el.useStylingPreset(app.theme.panel)
                    el.heightJustGrowth = 1
                    el.contentAlignment = Align.top
                    el.boundsAlignment = Align.stretch
                    Note("Navigation Bar")

                    startNewRow()
                    Field({
                      onCreate: (el, base) => {
                        const loader = app.loader
                        el.widthJustMin = "10em"
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
                      onChange: el => {
                        el.heightJustGrowth = 1
                      }
                    })

                    startNewRow()
                    Field({
                      onCreate: (el, base) => {
                        const loader = app.loader
                        el.widthJustMin = "10em"
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
              },
            })
            Section({
              onChange: el => {
                el.width = { min: "300", max: "400", growth: 3 } // 250px
                el.heightJustGrowth = 1
                el.contentAlignment = Align.stretch // has no effect
                WorkArea({
                  onChange: (el, base) => {
                    base()
                    el.useStylingPreset(theme.panel)
                    el.useStylingPreset(theme.accent)
                    el.widthJustGrowth = 3
                    el.heightJustGrowth = 1
                  }
                })
              },
            })
            Section({
              onChange: el => {
                el.width = { min: "250", growth: 1 } // 250px
                el.heightJustGrowth = 1
                Section({
                  mode: Mode.independentUpdate,
                  triggers: { theme },
                  onChange: el => {
                    el.useStylingPreset(theme.panel)
                    el.useStylingPreset(theme.markdown)
                    el.contentAlignment = Align.left + Align.top
                    el.boundsAlignment = Align.stretch
                    Markdown(EXAMPLE_CODE)
                  }
                })
              },
            })
          },
        })
        startNewRow()
        StatusBar({
          onChange: (el, base) => {
            base()
            el.widthJustGrowth = 1
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
