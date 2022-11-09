import { Block, BlockArgs, Txt, rowBegin } from "verstak"
import { Panel } from "./Panel.v"
import * as m from "theme/Common.m"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        mixins: [m.Panel, m.Brand],
        render() {
          Txt("N*V")
        }
      })

      Panel("Toolbar", {
        mixins: [m.Panel],
        widthGrow: 1,
        render(e, b) {
          b.baseRender()
          rowBegin(); Txt("multi")
          rowBegin(); Txt("line")
          rowBegin(); Txt("text")
        }
      })

      Block("Account", {
        mixins: [m.Panel, m.Unimportant],
        render(e) {
          Txt("Account")
        }
      })
    }})
  )
}
