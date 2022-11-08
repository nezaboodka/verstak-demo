import { block, BlockOptions, br, P, text } from "verstak"
import { App } from "models/App"
import { Panel } from "./Panel.v"
import * as z from "./Main.p"

export function Main(name: string, app: App, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, { rx: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      br()
      block("logo", { as: [z.Content, z.Important] }, e => {
        text("Logo")
      })
      block("toolbar", { as: [z.Content], box: { widthGrow: 1 } }, e => {
        text("Toolbar")
        br(); text("Toolbar can be multi-line")
      })
      block("account", { as: [z.Content, z.Unimportant] } , e => {
        text("Account")
      })

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
