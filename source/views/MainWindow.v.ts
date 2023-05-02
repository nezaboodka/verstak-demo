import { refs } from "reactronic"
import { Band, Align, Note, fromNewRow, Mode } from "verstak"
import { Markdown } from "verstak-markdown"
import { composeFieldModel, Field, MastakTheme } from "verstak-mastak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"

export function MainWindow() {
  return (
    Band({
      mode: Mode.PinpointRefresh,
      initialize(b) {
        App.current.sensors.listen(b.native)
      },
      render(b) {
        const app = App.current
        const theme = app.theme
        MastakTheme.current = theme

        b.useStyle(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        // b.contentAlignment = Align.Center
        b.widthGrowth = 1
        b.heightGrowth = 1

        ToolBar({
          render(b, base) {
            b.widthGrowth = 1
            base()
          }
        })

        fromNewRow()
        Band({
          render(b) {
            b.useStyle(app.theme.panel)
            b.minWidth = "10rem"
            b.contentAlignment = Align.Top
            b.blockAlignment = Align.Stretch
            Note("Navigation Bar")

            fromNewRow()
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

            fromNewRow()
            Band({
              render(b) {
                b.heightGrowth = 1
              }
            })

            fromNewRow()
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
          render(b, base) {
            base()
            b.useStyle(theme.panel)
            b.useStyle(theme.accent)
            b.widthGrowth = 3
            b.heightGrowth = 1
          }
        })
        Band({
          mode: Mode.PinpointRefresh,
          triggers: { theme },
          render(b) {
            b.useStyle(theme.panel)
            b.useStyle(theme.markdown)
            b.minWidth = "16rem"
            b.widthGrowth = 2
            b.contentAlignment = Align.Left + Align.Top,
            b.blockAlignment = Align.Stretch,
            Markdown(EXAMPLE_CODE)
          }
        })

        fromNewRow()
        StatusBar({
          render(b, base) {
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
  render(b) {
    // Blocks can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Align.Left + Align.CenterY)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Align.CenterX + Align.Top)
    Ruler("B", Align.CenterX + Align.Top)
    Ruler("C", Align.CenterX + Align.Top)
    fromNewRow(); Ruler("2", Align.Left + Align.CenterY)
    fromNewRow(); Ruler("3", Align.Left + Align.CenterY)
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
