import { Block, BlockArgs, PlainText } from "verstak"
import * as m from "theme/Common.m"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, { ...args, wrapper: args.render, render(e, b) {
      Block("title", {
        widthGrowth: 1,
        render(e, b) {
          b.apply(m.PanelTitle)
          PlainText(name)
        }
      })
    }})
  )
}
