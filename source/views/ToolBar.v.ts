import { Block, BlockArgs, $row, $text } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        reuse: [css.Panel, css.Brand],
        render() {
          $text`N*V`
        }
      })

      Panel("Toolbar", {
        reuse: [css.Panel],
        widthGrow: 1,
        render(e, b) {
          b.baseRender()
          $row(s => $text`multi`)
          $row(s => $text`line`)
          $row(s => $text`text`)
        }
      })

      Block("Account", {
        reuse: [css.Panel, css.Unimportant],
        render(e) {
          $text`Account`
        }
      })
    }})
  )
}
