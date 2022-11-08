import { Block, BlockArgs, section, $ } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function ToolBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, args, (e, b) => {
      Block("Logo", [css.Panel, css.Brand], e => {
        $`N*V`
      })

      Panel("Toolbar", { as: [css.Panel], widthGrow: 1 }, (e, b) => {
        b.baseRender()
        section(s => $`multi`)
        section(s => $`line`)
        section(s => $`text`)
      })

      Block("Account", [css.Panel, css.Unimportant], e => {
        $`Account`
      })
    })
  )
}
