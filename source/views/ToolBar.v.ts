import { Block, BlockArgs, section, $ } from "verstak"
import * as css from "theme/Common.css"
import { Panel } from "./Panel.v"

export function ToolBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, args, (e, b) => {
      Block("Logo", [css.Panel, css.Brand], e => {
        $`N*`
      })

      Panel("Toolbar", { widthGrow: 1, use: [css.Panel] }, (e, b) => {
        b.render() // base render
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
