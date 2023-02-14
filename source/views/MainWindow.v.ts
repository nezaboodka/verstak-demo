import { refs } from "reactronic"
import { Band, Align, Note, fromNewLine } from "verstak"
import { Markdown } from "verstak-markdown"
import { createFieldModel, Field, $theme } from "gost-pi"
import { $app } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"

export function MainWindow() {
  return (
    Band({
      reaction: true,
      initialize(b) {
        $app.value.sensors.listen(b.native)
      },
      render(b) {
        const app = $app.value
        const theme = app.theme
        $theme.value = theme

        b.contentAlignment = Align.Top
        b.heightGrowth = 1

        fromNewLine(l => {
          ToolBar({
            render(b, base) {
              b.widthGrowth = 1
              base()
            }
          })
        })

        fromNewLine(l => { // main line
          Band({
            render(b) {
              b.style(app.theme.panel)
              b.minWidth = "10rem"
              b.contentAlignment = Align.Top
              b.blockAlignment = Align.Stretch
              Note("Navigation Bar")
              fromNewLine()
              Field({
                initialize(b, base) {
                  const loader = app.loader
                  b.minWidth = "10em"
                  b.model = createFieldModel({
                    icon: "fa-solid fa-search",
                    text: refs(loader).filter,
                    options: refs(loader).loaded,
                    isHotText: true,
                    isMultiLineText: false,
                  })
                  base()
                },
              })
              fromNewLine()
              Band({
                render(b) {
                  b.heightGrowth = 1
                }
              })
              fromNewLine()
              Field({
                initialize(b, base) {
                  const loader = app.loader
                  b.minWidth = "10em"
                  b.model = createFieldModel({
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
              b.style(theme.panel)
              b.style(theme.accent)
              b.widthGrowth = 3
              b.heightGrowth = 1
            }
          })
          Band({
            reaction: true,
            triggers: { theme },
            render(b) {
              b.style(theme.panel)
              b.style(theme.markdown)
              b.minWidth = "16rem"
              b.widthGrowth = 2
              b.contentAlignment = Align.Left + Align.Top,
              b.blockAlignment = Align.Stretch,
              Markdown(EXAMPLE_CODE)
            }
          })
        })

        fromNewLine(l => {
          StatusBar({
            render(b, base) {
              base()
              b.widthGrowth = 1
            }
          })
        })
      },
    })
  )
}

const EXAMPLE_CODE = `
Block size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user. System is suitable both to lay out
application panels and to create reusable components.

\`\`\` js
Table("Example", {
  render(b) {
    // Blocks can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Align.Left, true)
    Ruler("A", Align.Top + Align.CenterX)
    Ruler("B", Align.Top + Align.CenterX)
    Ruler("C", Align.Top + Align.CenterX);
    fromNewLine(); Ruler("2", Align.Left)
    fromNewLine(); Ruler("3", Align.Left)
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
