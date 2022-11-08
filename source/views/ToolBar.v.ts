import { Block, $, $br, $bounds, BlockPreset} from "verstak"
import * as css from "theme/Common.css"
import { Panel } from "./Panel.v"

export function ToolBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      Block("logo", [css.Panel, css.Brand], e => {
        $("Logo")
      })

      $bounds({ widthGrow: 1 })
      Panel("Toolbar", [css.Panel], (e, b) => {
        b.render() // base render
        $("multi"); $br()
        $("line"); $br()
        $("text"); $br()
      })

      Block("account", [css.Panel, css.Unimportant], e => {
        $("Account")
      })
    })
  )
}
