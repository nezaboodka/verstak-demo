import { Block, BlockOptions, section, $} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    Block(name, { observer: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      section(s => {
        ToolBar("ToolBar", { widthGrow: 1 })
      })

      section(s => {
        Block("Navigation-Bar", [css.Panel], e => {
          $`Navigation-Bar`
        })

        WorkArea("WorkArea", {
          widthGrow: 1, heightGrow: 1,
          use: [css.Panel, css.Important],
        })

        Block("Property-Inspector", [css.Panel], e => {
          $`Property-Inspector`
        })
      })

      section(() => {
        StatusBar("StatusBar", { widthGrow: 1 } )
      })
    })
  )
}
