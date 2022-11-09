import { Block, BlockArgs, Txt, $rowBegin } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        reuse: [css.Panel, css.Brand],
        render() {
          Txt("N*V")
        }
      })

      Panel("Toolbar", {
        reuse: [css.Panel],
        widthGrow: 1,
        render(e, b) {
          b.baseRender()
          $rowBegin(); Txt("multi")
          $rowBegin(); Txt("line")
          $rowBegin(); Txt("text")
        }
      })

      Block("Account", {
        reuse: [css.Panel, css.Unimportant],
        render(e) {
          Txt("Account")
        }
      })
    }})
  )
}
