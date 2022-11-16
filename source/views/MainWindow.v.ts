import { cx } from "@emotion/css"
import { Block, Align, PlainText, lineFeed, use, setSubTreeContext } from "verstak"
import { Markdown } from "verstak-markdown"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as s from "themes/Common.s"

export function MainWindow(name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      render(b) {
        b.alignContent = Align.Top
        b.heightGrowth = 1
        b.native.style.backgroundColor = "rgba(230, 230, 230)"

        setSubTreeContext(Theme, use(App).theme)

        // Tool bar row
        ToolBar("ToolBar", (b, base) => {
          b.widthGrowth = 1
          base()
        })
        lineFeed()
        // Main row
        Block("NavBar", b => {
          b.widthMin = "10rem"
          b.alignContent = Align.Top
          b.alignFrame = Align.Stretch
          b.native.className = s.Panel
          PlainText("Navigation Bar")
        })
        WorkArea("GridExample", (b, base) => {
          b.widthGrowth = 3
          b.heightGrowth = 1
          b.native.className = cx(s.Panel, s.Important)
          base()
        })
        Block("MarkdownExample", {
          reacting: true,
          render(b) {
            const theme = use(Theme)
            b.widthMin = "16rem"
            b.widthGrowth = 2
            b.alignContent = Align.Left + Align.Top,
            b.alignFrame = Align.Stretch,
            b.native.className = cx(s.Panel, theme.markdown)
            Markdown("Verstak", CODE)
          }
        })
        // Status bar row
        lineFeed()
        StatusBar("StatusBar", (b, base) => {
          b.widthGrowth = 1
          base()
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
  render(b) {
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
