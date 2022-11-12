import { Block, BlockArgs, PlainText, To } from "verstak"
import * as s from "themes/Common.s"

export function Panel(name: string,
  args: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      render(e, b) {
        Block("title", {
          widthGrowth: 1,
          alignContent: args.alignContent,
          alignFrame: args.alignFrame,
          initialize(e, b) {
            e.className = s.PanelTitle
          },
          render(e, b) {
            PlainText(name)
          }
        })
      }
    })
  )
}
