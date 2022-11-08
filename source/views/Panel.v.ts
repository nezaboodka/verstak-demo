import { Block, BlockArgs, $ } from "verstak"
import * as css from "theme/Common.css"

export function Panel(name: string,
  args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, { ...args, wrapper: args.render, render(e, b) {
      Block("title", {
        reuse: [css.PanelTitle],
        widthGrow: 1,
        render(e) {
          $`${name}`
        }
      })
    }})
  )
}
