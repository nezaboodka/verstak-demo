import { Block, BlockArgs, PlainText, lineFeed, To, Img } from "verstak"
import { Panel } from "./Panel.v"
import * as m from "theme/Common.m"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        mixins: [m.Panel],
        render(e) {
          e.style.backgroundColor = "white"
          e.style.padding = "0.5rem"
          Img("N*", {
            render(e) {
              e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              e.style.height = "3em"
              e.style.width = "auto"
            }
          })
        }
      })

      Panel("Toolbar", {
        mixins: [m.Panel],
        widthGrab: 1,
        align: To.Center,
        render(e, b) {
          b.baseRender()
          lineFeed(); PlainText("Пример многострочного текста")
          lineFeed(); PlainText("Попробуйте изменить размеры окна браузера")
        }
      })

      Block("Account", {
        mixins: [m.Panel, m.Hint],
        render(e) {
          PlainText("Account")
        }
      })
    }})
  )
}
