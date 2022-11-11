import { Grid, BlockArgs, Block, PlainText, HtmlText, lineFeed, To } from "verstak"
import * as s from "theme/Common.s"

export function WorkArea(name: string,
  args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Grid(name, {
      ...args,
      wrapper: args?.render,
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
      }
    })
  )
}

function Ruler(title: string, alignFrame: To, overlap?: boolean) {
  Block(`#${title}`, {
    alignFrame,
    widthOverlap: overlap,
    render(e, b) {
      e.style.zIndex = "1"
      e.style.fontSize = "smaller"
      HtmlText(`&nbsp;${title}`)
    }
  })
}

function ExampleData(place: string) {
  Block(place, {
    place, // absolute position inside grid
    alignContent: To.Center + To.CenterV,
    initialize(e, b) {
      e.className = s.Important
    },
    render(e, b) {
      PlainText(place)
    }
  })
}
