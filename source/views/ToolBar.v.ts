import { Block, $, $br, $bounds, BlockPreset} from "verstak"
import * as css from "theme/Common.css"

export function ToolBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      Block("logo", [css.Panel, css.Brand], e => {
        $("Logo")
      })

      $bounds({ widthGrow: 1 })
      Block("toolbar", [css.Panel], e => {
        $("Toolbar")
        $br()
        $("Toolbar can be multi-line")
      })

      Block("account", [css.Panel, css.Unimportant], e => {
        $("Account")
      })
    })
  )
}
