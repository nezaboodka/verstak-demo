import { Grid, BlockArgs, Block, Plain, lineFeed, To, Markdown } from "verstak"
import * as m from "theme/Common.m"

export function WorkArea(name: string,
  args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Grid(name, { ...args, wrapper: args?.render, render(e, b) {
      // When "place" arg is not provided, then cells are
      // assigned to blocks sequentially rightwards-downwards
      // with the respect to line feeds.
      Ruler("1", To.Left, true)
      Ruler("A", To.Top)
      Ruler("B", To.Top)
      Ruler("C", To.Top); lineFeed()
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
    }})
  )
}

function Ruler(title: string, dock: To, overlap?: boolean) {
  Block(`#${title}`, {
    dock,
    widthOverlap: overlap,
    render(e) {
      e.style.zIndex = "1"
      Markdown(`&nbsp;${title}`)
    }
  })
}

function ExampleData(place: string) {
  Block(place, {
    mixins: [m.Important],
    place, // absolute position inside grid
    align: To.Center + To.CenterV,
    render(e, b) {
      Plain(place)
    }
  })
}
