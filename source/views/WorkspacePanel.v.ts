import { block, sep, text } from "verstak"
import { App } from "models/App"

export function WorkspacePanel(name: string, app: App) {
  return (
    block(name, undefined, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }
      text("Text1")
      sep()
      text("Text2")
    })
  )
}
