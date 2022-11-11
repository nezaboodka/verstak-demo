import { Block, BlockArgs, PlainText } from "verstak"
import * as s from "theme/Common.s"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, {
      ...args,
      wrapper: args.render,
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
