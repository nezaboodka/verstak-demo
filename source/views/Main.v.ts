import { $bounds, block, BlockOptions, br, P, text } from "verstak"
import { App } from "models/App"
import { Panel } from "./Panel.v"
import * as z from "theme/Common.css"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      br()
      block("logo", [z.Content, z.Brand], e => {
        text("Logo")
      })
      $bounds({ widthGrow: 1 })
      block("toolbar", [z.Content], e => {
        text("Toolbar")
        br(); text("Toolbar can be multi-line")
      })
      block("account", [z.Content, z.Unimportant], e => {
        text("Account")
      })

      br()
      Panel("Navigation-Bar", "...")
      $bounds({ widthGrow: 1, heightGrow: 1 })
      Panel("Main-Working-Area", "...")
      Panel("Property-Inspector", "...")

      br()
      $bounds({ widthGrow: 1 })
      Panel("Status-Bar", "...")
      Panel("Indicator-1", "...")
      Panel("Indicator-2", "...")
      Panel("Indicator-3", "...")
    })
  )
}
