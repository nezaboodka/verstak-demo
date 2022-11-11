import { Block, BlockArgs, PlainText } from "verstak"
import * as m from "theme/Common.m"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, { ...args, wrapper: args.render, render(e, b) {
      Block("title", {
        mixins: [m.PanelTitle],
        widthGrowth: 1,
        render(e) {
          PlainText(name)
        }
      })
    }})
  )
}
