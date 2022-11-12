import { Block, BlockArgs, PlainText } from "verstak"
import * as s from "themes/Common.s"

export function Panel(name: string,
  args: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args,
      render(e, b) {
        Block("title", {
          widthGrowth: 1,
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
