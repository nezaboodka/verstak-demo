import { Block, BlockArgs, PlainText, asComponent } from "verstak"
import * as s from "themes/Common.s"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
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
      },
    }))
  )
}
