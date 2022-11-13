import { cx } from "@emotion/css"
import { Block, To, PlainText, lineFeed, use, setContext } from "verstak"
import { Markdown } from "verstak-markdown"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import { Loader } from "models/Loader"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import { createFieldModel, Field } from "components/Field.v"
import { refs } from "reactronic"
import * as s from "themes/Common.s"

export function Main(name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      alignContent: To.Top,
      heightGrowth: 1,
      render(e, b) {
        const app = use(App)
        setContext(Theme, app.theme)
        e.style.backgroundColor = "rgba(230, 230, 230)"

        ToolBar("ToolBar", {
          widthGrowth: 1,
        })

        lineFeed()
        Block("NavBar", {
          widthMin: "10rem",
          alignContent: To.Top,
          alignFrame: To.Fit,
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            Field("Dropdown1", {
              widthGrowth: 1,
              initialize(e, b, base) {
                const loader = app.loader
                b.model = createFieldModel({
                  text: refs(loader).filter,
                  options: refs(loader).loaded,
                  isHotText: true,
                })
                base()
              },
              render(e, b, base) {
                base()
              },
            })
            lineFeed()
            PlainText("Type text above")
          }
        })
        WorkArea("GridExample", {
          widthGrowth: 3,
          heightGrowth: 1,
          initialize(e, b) {
            e.className = cx(s.Panel, s.Important)
          },
        })
        Block("MarkdownExample", {
          reacting: true,
          widthMin: "16rem",
          widthGrowth: 2,
          alignContent: To.Left + To.Top,
          alignFrame: To.Fit,
          render(e, b) {
            const theme = use(Theme)
            e.className = cx(s.Panel, theme.markdown)
            Markdown("Verstak", CODE)
          }
        })

        lineFeed()
        StatusBar("StatusBar", {
          widthGrowth: 1,
        })
      },
    })
  )
}

const CODE = `
Block size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user. System is suitable both to lay out
application panels and to create reusable components.

\`\`\` js
Grid("Example", {
  render(e, b) {
    // Blocks can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", To.Left, true)
    Ruler("A", To.Top + To.Center)
    Ruler("B", To.Top + To.Center)
    Ruler("C", To.Top + To.Center); lineFeed()
    Ruler("2", To.Left); lineFeed()
    Ruler("3", To.Left); lineFeed()
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
