import { refs } from "reactronic"
import { Section, Align, Note, startNewRow, Mode } from "verstak"
import { Markdown } from "verstak-markdown"
import { composeFieldModel, Field, Theme } from "verstak-mastak"
import { App } from "models/App.js"
import { ToolBar } from "./ToolBar.v.js"
import { StatusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.PinpointRebuild,
      initialize(b) {
        App.actual.sensors.listen(b.native)
      },
      rebuild(b) {
        const app = App.actual
        const theme = app.theme
        Theme.actual = theme

        b.useStyle(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        b.widthGrowth = 1
        b.heightGrowth = 1

        ToolBar({
          rebuild(b, base) {
            b.widthGrowth = 1
            base()
          }
        })

        startNewRow()
        Section({
          rebuild(b) {
            b.useStyle(app.theme.panel)
            b.minWidth = "10rem"
            b.contentAlignment = Align.Top
            b.blockAlignment = Align.Stretch
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
              rebuild(b) {
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
          rebuild(b, base) {
            base()
            b.useStyle(theme.panel)
            b.useStyle(theme.accent)
            b.widthGrowth = 3
            b.heightGrowth = 1
          }
        })
        Section({
          mode: Mode.PinpointRebuild,
          triggers: { theme },
          rebuild(b) {
            b.useStyle(theme.panel)
            b.useStyle(theme.markdown)
            b.minWidth = "16rem"
            b.widthGrowth = 2
            b.contentAlignment = Align.Left + Align.Top,
            b.blockAlignment = Align.Stretch,
            Markdown(EXAMPLE_CODE)
          }
        })

        startNewRow()
        StatusBar({
          rebuild(b, base) {
            base()
            b.widthGrowth = 1
          }
        })
      },
    })
  )
}

const EXAMPLE_CODE = `
Block size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user.

\`\`\` js
Table("Example", {
  rebuild(b) {
    // Blocks can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Align.Left + Align.CenterY)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Align.CenterX + Align.Top)
    Ruler("B", Align.CenterX + Align.Top)
    Ruler("C", Align.CenterX + Align.Top)
    startNewRow(); Ruler("2", Align.Left + Align.CenterY)
    startNewRow(); Ruler("3", Align.Left + Align.CenterY)
    // Blocks can also be layed out
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
