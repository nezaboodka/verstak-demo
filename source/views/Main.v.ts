import { Block, BlockOptions, $, $br, $bounds} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    Block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      $br()
      $bounds({ widthGrow: 1 })
      ToolBar("ToolBar")

      $br()
      Block("Navigation-Bar", [css.Panel], e => {
        $("Navigation-Bar")
      })
      $bounds({ widthGrow: 1, heightGrow: 1 })
      WorkArea("WorkArea", [css.Panel, css.Important])
      Block("Property-Inspector", [css.Panel], e => {
        $("Property-Inspector")
      })

      $br()
      $bounds({ widthGrow: 1 })
      StatusBar("StatusBar")
    })
  )
}
