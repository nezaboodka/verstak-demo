import { Grid, BlockArgs, Markdown, Block, Align, lineFeed } from "verstak"
import * as m from "theme/Common.m"

export function WorkArea(name: string,
  args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Grid(name, { ...args, wrapper: args?.render, render(e, b) {
      // Markdown("<b>Verstak</b> is a front-end library<br/>for building interactive user interfaces")
      Block("A1:C1", {
        mixins: [m.Important],
        place: "A1:C1",
        docking: Align.Fit,
        render(e, b) {
          Markdown("Верстка на основе табличной сетки")
          lineFeed()
          Markdown("(A1:C1)")
        }
      })
      Block("B3", {
        mixins: [m.Important],
        place: "B3",
        docking: Align.Fit,
        render(e, b) {
          Markdown("(B3) Центр")
        }
      })
      Block("A2:B2", {
        mixins: [m.Important],
        place: "A2:B2",
        docking: Align.Fit,
        render(e, b) {
          Markdown("A2:B2")
        }
      })
      Block("C2:C3", {
        mixins: [m.Important],
        place: "C2:C3",
        docking: Align.Fit,
        render(e, b) {
          Markdown("C2:C3")
        }
      })
      Block("B4:C4", {
        mixins: [m.Important],
        place: "B4:C4",
        docking: Align.Fit,
        render(e, b) {
          Markdown("B4:C4")
        }
      })
      Block("A3:A4", {
        mixins: [m.Important],
        place: "A3:A4",
        docking: Align.Fit,
        render(e, b) {
          Markdown("A3:A4")
        }
      })
    }})
  )
}
