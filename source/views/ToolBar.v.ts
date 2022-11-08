import { Block, text, lbr, useBounds, BlockPreset} from "verstak"
import * as css from "theme/Common.css"
import { Panel } from "./Panel.v"

export function ToolBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      Block("logo", [css.Panel, css.Brand], e => {
        text("Logo")
      })

      useBounds({ widthGrow: 1 })
      Panel("Toolbar", [css.Panel], (e, b) => {
        b.render() // base render
        lbr(); text("multi")
        lbr(); text("line")
        lbr(); text("text")
      })

      Block("account", [css.Panel, css.Unimportant], e => {
        text("Account")
      })
    })
  )
}
