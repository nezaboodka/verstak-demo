import { Block, To, PlainText, lineFeed } from "verstak"
import { Markdown } from "verstak-markdown"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as m from "theme/Common.m"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      align: To.Top,
      render(e, b) {
        e.style.backgroundColor = "rgba(230, 230, 230)"

        ToolBar("ToolBar", {
          widthGrab: 1,
        })

        lineFeed()
        Block("NavBar", {
          mixins: [m.Panel],
          widthMin: "10rem",
          dock: To.Fit,
          render() {
            PlainText("Navigation Panel")
          }
        })
        WorkArea("GridExample", {
          mixins: [m.Panel, m.Important],
          widthGrab: 1, heightGrab: 1,
        })
        Block("MarkdownExample", {
          mixins: [m.Panel, m.Hint],
          widthMin: "16rem",
          widthGrab: 1,
          align: To.Left,
          dock: To.Top,
          render() {
            Markdown("Verstak", `
Sizings of blocks are automatically adjusted to size of
table cells, while grid is automatically adjusted to
screen size on a screen of each user. System fits well
both to layout application panels and to create reusable
components.

\`\`\` js
Grid("Example", {
  render(e, b) {
    // When "place" arg is not provided, then cells are
    // assigned to blocks sequentially rightwards-downwards
    // with the respect to line feeds.
    Ruler("1", To.Left, true)
    Ruler("A", To.Top + To.Center)
    Ruler("B", To.Top + To.Center)
    Ruler("C", To.Top + To.Center); lineFeed()
    Ruler("2", To.Left); lineFeed()
    Ruler("3", To.Left); lineFeed()
    // When "place" arg is provided, then blocks are
    // positioned exactly at the provided cell or
    // cell range.
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
          widthGrab: 1,
        })
      },
    })
  )
}
