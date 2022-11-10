import { Grid, BlockArgs, Block, Plain, lineFeed } from "verstak"
import * as m from "theme/Common.m"

export function WorkArea(name: string,
  args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Grid(name, { ...args, wrapper: args?.render, render(e, b) {
      Block("A1:C1", {
        mixins: [m.Important],
        place: "A1:C1",
        render(e, b) {
          Plain("Верстка на основе табличной сетки")
          lineFeed()
          Plain("(A1:C1)")
        }
      })
      Block("B3", {
        mixins: [m.Important],
        place: "B3",
        render(e, b) {
          Plain("Центр")
          lineFeed()
          Plain("(B3)")
        }
      })
      Block("A2:B2", {
        mixins: [m.Important],
        place: "A2:B2",
        render(e, b) {
          Plain("(A2:B2)")
        }
      })
      Block("C2:C3", {
        mixins: [m.Important],
        place: "C2:C3",
        render(e, b) {
          Plain("(C2:C3)")
        }
      })
      Block("B4:C4", {
        mixins: [m.Important],
        place: "B4:C4",
        render(e, b) {
          Plain("(B4:C4)")
        }
      })
      Block("A3:A4", {
        mixins: [m.Important],
        place: "A3:A4",
        render(e, b) {
          Plain("(A3:A4)")
        }
      })
    }})
  )
}
