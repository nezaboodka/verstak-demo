import { Block, BlockArgs, Align, Txt, Row, rowBegin } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function StatusBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Panel("Status", {
        reuse: [css.Panel],
        widthGrow: 1,
        align: Align.BottomCenter,
        render(e, b) {
          b.baseRender()
          rowBegin()
          Txt("status bar content")
        }
      })

      Panel("Ind-1", {
        reuse: [css.Panel, css.Center],
        render(e, b) {
          b.baseRender()
          rowBegin()
          Txt("[1]")
        }
      })

      Panel("Ind-2", {
        reuse: [css.Panel, css.Center],
        render(e, b) {
          b.baseRender()
          Txt("[2]")
        }
      })

      Panel("Ind-3", {
        reuse: [css.Panel, css.Center],
        render(e, b) {
          b.baseRender()
          Txt("[3]")
        }
      })
    }})
  )
}
