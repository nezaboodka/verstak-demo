import { cx } from "@emotion/css"
import { Block, To, PlainText, lineFeed } from "verstak"
import { Markdown } from "verstak-markdown"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as s from "theme/Common.s"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      alignContent: To.Top,
      render(e, b) {
        e.style.backgroundColor = "rgba(230, 230, 230)"

        ToolBar("ToolBar", {
          widthGrowth: 1,
        })

        lineFeed()
        Block("NavBar", {
          widthMin: "10rem",
          alignFrame: To.Fit,
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            PlainText("Navigation Panel")
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
          widthMin: "16rem",
          widthGrowth: 2,
          alignContent: To.Left,
          alignFrame: To.Top,
          initialize(e, b) {
            e.className = cx(s.Panel, s.Hint)
          },
          render(e, b) {
            Markdown("Verstak", `
Sizings of blocks are automatically adjusted to size of
table cells, while grid is automatically adjusted to
screen size on a screen of each user. System fits well
both to layout application panels and to create reusable
components.

\`\`\` js
// TypeScript

Grid("Example", {
  render(e, b) {
    // Blocks can be layout out automatically
    // based on their order and line feeds.
    Ruler("1", To.Left, true)
    Ruler("A", To.Top + To.Center)
    Ruler("B", To.Top + To.Center)
    Ruler("C", To.Top + To.Center); lineFeed()
    Ruler("2", To.Left); lineFeed()
    Ruler("3", To.Left); lineFeed()
    // And blocks be be layout out
    // explicitly in given cells.
    ExampleData("B2")
    ExampleData("A1:B1")
    ExampleData("C1:C2")
    ExampleData("B3:C3")
    ExampleData("A2:A3")
  },
})
\`\`\`
`)
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
