import { Block, BlockOptions, text, lbr, useBounds} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    Block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      lbr() // line break
      useBounds({ widthGrow: 1 })
      ToolBar("ToolBar")

      lbr() // line break
      Block("Navigation-Bar", [css.Panel], e => {
        text("Navigation-Bar")
      })

      useBounds({ widthGrow: 1, heightGrow: 1 })
      WorkArea("WorkArea", [css.Panel, css.Important])

      Block("Property-Inspector", [css.Panel], e => {
        text("Property-Inspector")
      })

      lbr() // line break
      useBounds({ widthGrow: 1 })
      StatusBar("StatusBar")
    })
  )
}
