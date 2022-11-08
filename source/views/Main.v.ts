import { $bounds, Block, BlockOptions, br, $ } from "verstak"
import { App } from "models/App"
import { Panel } from "./Panel.v"
import * as z from "theme/Common.css"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    Block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      br() // =====

      Block("logo", [z.Content, z.Brand], e => {
        $("Logo")
      })

      $bounds({ widthGrow: 1 })
      Block("toolbar", [z.Content], e => {
        $("Toolbar")
        br(); $("Toolbar can be multi-line")
      })

      Block("account", [z.Content, z.Unimportant], e => {
        $("Account")
      })

      br() // =====

      Panel("Navigation-Bar", "...")

      $bounds({ widthGrow: 1, heightGrow: 1 })
      Panel("Main-Working-Area", "...")

      Panel("Property-Inspector", "...")

      br() // =====

      $bounds({ widthGrow: 1 })
      Panel("Status-Bar", "...")

      Panel("Indicator-1", "...")

      Panel("Indicator-2", "...")

      Panel("Indicator-3", "...")
    })
  )
}
