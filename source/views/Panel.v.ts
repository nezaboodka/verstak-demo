import { Block, BlockArgs, PlainText } from "verstak"
import * as z from "theme/Common.z"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, {
      ...args,
      wrapper: args.render,
      render(e, b) {
        Block("title", {
          widthGrowth: 1,
          initialize: z.PanelTitle,
          render(e, b) {
            PlainText(name)
          }
        })
      }
    })
  )
}
