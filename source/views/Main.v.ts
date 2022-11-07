import { block, BlockOptions, begin } from "verstak"
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

      begin()
      Panel("Logo", "...")
      Panel("Toolbar", "...", { box: { wGrow: 1 } })
      Panel("Account", "...")

      begin({ box: { hGrow: 1 } })
      Panel("Navigation-Bar", "...")
      Panel("Main", "...", { box: { wGrow: 1 } })
      Panel("Inspector", "...")

      begin()
      Panel("Settings", "...")
      Panel("Status", "...", { box: { wGrow: 1 } })
      Panel("Nope", "...")
    })
  )
}
