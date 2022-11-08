import { Block, BlockArgs, $row, $ } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        reuse: [css.Panel, css.Brand],
        render() {
          $`N*V`
        }
      })

      Panel("Toolbar", {
        reuse: [css.Panel],
        widthGrow: 1,
        render(e, b) {
          b.baseRender()
          $row(s => $`multi`)
          $row(s => $`line`)
          $row(s => $`text`)
        }
      })

      Block("Account", {
        reuse: [css.Panel, css.Unimportant],
        render(e) {
          $`Account`
        }
      })
    }})
  )
}
