import { Grid, BlockBody, Block, PlainText, HtmlText, lineFeed, Align, asBaseFor } from "verstak"
import * as s from "themes/Common.s"

export function WorkArea(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Grid(asBaseFor(body, {
      render(b) {
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

function Ruler(title: string, frameAlignment: Align, overlap?: boolean) {
  Block(b => {
    b.frameAlignment = frameAlignment
    b.cells = { horizontalOverlap: overlap }
    b.native.style.zIndex = "1"
    b.native.style.fontSize = "smaller"
    HtmlText(`&nbsp;${title}`)
  })
}

function ExampleData(place: string) {
  Block({
    initialize(b) {
      b.contentAlignment = Align.Center + Align.CenterV
      b.native.className = s.Important
    },
    render(b) {
      b.cells = place
      PlainText(place)
    }
  })
}
