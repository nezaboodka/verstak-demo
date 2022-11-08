import { Block, BlockOptions, row, $} from "verstak"
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

      row(() => {
        ToolBar("ToolBar", {
          widthGrow: 1,
        })
      })

      row(() => {
        Block("Navigation-Bar", [css.Panel], e => {
          $`Navigation-Bar`
        })

        WorkArea("WorkArea", {
          widthGrow: 1, heightGrow: 1,
          mixins: [css.Panel, css.Important],
        })

        Block("Property-Inspector", [css.Panel], e => {
          $`Property-Inspector`
        })
      })

      row(() => {
        StatusBar("StatusBar", { widthGrow: 1 } )
      })
    })
  )
}
