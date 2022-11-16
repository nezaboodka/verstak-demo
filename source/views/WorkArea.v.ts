import { Grid, BlockVmt, Block, PlainText, HtmlText, lineFeed, Align, asComponent } from "verstak"
import * as s from "themes/Common.s"

export function WorkArea(name: string,
  vmt?: BlockVmt<HTMLElement, void, void>) {
  return (
    Grid(name, asComponent(vmt, {
      render(e, b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left, true)
        Ruler("A", Align.Top + Align.Center)
        Ruler("B", Align.Top + Align.Center)
        Ruler("C", Align.Top + Align.Center); lineFeed()
        Ruler("2", Align.Left); lineFeed()
        Ruler("3", Align.Left); lineFeed()
        // Blocks can also be layed out
        // explicitly in exact cells.
        ExampleData("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
      },
    }))
  )
}

function Ruler(title: string, alignFrame: Align, overlap?: boolean) {
  Block(`#${title}`, {
    render(e, b) {
      b.alignFrame = alignFrame
      b.cells = { horizontalOverlap: overlap }
      e.style.zIndex = "1"
      e.style.fontSize = "smaller"
      HtmlText(`&nbsp;${title}`)
    }
  })
}

function ExampleData(place: string) {
  Block(place, {
    initialize(e, b) {
      b.alignContent = Align.Center + Align.CenterV
      e.className = s.Important
    },
    render(e, b) {
      b.cells = place
      PlainText(place)
    }
  })
}
