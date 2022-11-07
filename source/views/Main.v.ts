import { block, BlockOptions, br } from "verstak"
import { App } from "models/App"
import { Panel } from "./Panel.v"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      br()
      Panel("Logo", "...")
      Panel("Toolbar", "...", { box: { widthGrow: 1 } })
      Panel("Account", "...", { box: { widthGrow: 1 } })

      br()
      Panel("Navigation-Bar", "...")
      Panel("Main-Working-Area", "...", { box: { widthGrow: 1, heightGrow: 1 } })
      Panel("Property-Inspector", "...")

      br()
      Panel("Status-Bar", "...", { box: { widthGrow: 1 } })
      Panel("Indicator-1", "...")
      Panel("Indicator-2", "...")
      Panel("Indicator-3", "...")
    })
  )
}
