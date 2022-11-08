import { Block, BlockArgs, Render, argsToOptions, text } from "verstak"
import * as css from "theme/Common.css"

export function Panel(name: string,
  args?: BlockArgs<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  args = argsToOptions(args, { wrapper: render })
  return (
    Block(name, args, (e, b) => {
      Block("title", { widthGrow: 1, apply: [css.PanelTitle] }, e => {
        text(name)
      })
    })
  )
}
