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
      mode: Mode.PinpointUpdate,
      initialize(b) {
        App.actual.sensors.listen(b.native)
      },
      update(b) {
        const app = App.actual
        const theme = app.theme
        Theme.actual = theme

        b.useStyle(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        b.widthGrowth = 1
        b.heightGrowth = 1

        ToolBar({
          update(b, base) {
            b.widthGrowth = 1
            base()
          }
        })

        startNewRow()
        Section({
          update(b) {
            b.useStyle(app.theme.panel)
            b.minWidth = "10rem"
            b.contentAlignment = Align.ToTop
            b.elementAlignment = Align.ToBounds
            Note("Navigation Bar")

            startNewRow()
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
            })

            startNewRow()
            Section({
              update(b) {
                b.heightGrowth = 1
              }
            })

            startNewRow()
            Field({
              initialize(b, base) {
                const loader = app.loader
                b.minWidth = "10em"
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
            b.useStyle(theme.panel)
            b.useStyle(theme.accent)
            b.widthGrowth = 3
            b.heightGrowth = 1
          }
        })
        Section({
          mode: Mode.PinpointUpdate,
          triggers: { theme },
          update(b) {
            b.useStyle(theme.panel)
            b.useStyle(theme.markdown)
            b.minWidth = "16rem"
            b.widthGrowth = 2
            b.contentAlignment = Align.ToLeft + Align.ToTop,
            b.elementAlignment = Align.ToBounds,
            Markdown(EXAMPLE_CODE)
          }
        })

        startNewRow()
        StatusBar({
          update(b, base) {
            base()
            b.widthGrowth = 1
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
    Ruler("1", Align.Left + Align.CenterY)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Align.CenterX + Align.Top)
    Ruler("B", Align.CenterX + Align.Top)
    Ruler("C", Align.CenterX + Align.Top)
    startNewRow(); Ruler("2", Align.Left + Align.CenterY)
    startNewRow(); Ruler("3", Align.Left + Align.CenterY)
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
