import { Grid, BlockArgs, Block, Plain, lineFeed, To, Markdown } from "verstak"
import * as m from "theme/Common.m"

export function WorkArea(name: string,
  args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Grid(name, { ...args, wrapper: args?.render, render(e, b) {

      // Grid Flow: rightwards-downwards
      Ruler("1", To.Left, true)
      Ruler("A", To.Top)
      Ruler("B", To.Top)
      Ruler("C", To.Top); lineFeed()
      Ruler("2", To.Left); lineFeed()
      Ruler("3", To.Left); lineFeed()

      // Absolute positioning inside grid
      Block("B2", {
        mixins: [m.Important],
        place: "B2",
        render(e, b) { Plain("B2") }
      })
      Block("A1:B1", {
        mixins: [m.Important],
        place: "A1:B1",
        render(e, b) { Plain("A1:B1") }
      })
      Block("C1:C2", {
        mixins: [m.Important],
        place: "C1:C2",
        render(e, b) { Plain("C1:C2") }
      })
      Block("B3:C3", {
        mixins: [m.Important],
        place: "B3:C3",
        render(e, b) { Plain("B3:C3") }
      })
      Block("A2:A3", {
        mixins: [m.Important],
        place: "A2:A3",
        render(e, b) { Plain("A2:A3") }
      })
    }})
  )
}

function Ruler(title: string, dock: To, overlap?: boolean) {
  Block(`#${title}`, {
    dock,
    widthOverlap: overlap,
    render(e) {
      Markdown(`&nbsp;${title}`)
    }
  })
}
