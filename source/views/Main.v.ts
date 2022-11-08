import { $bounds, Block, BlockOptions, $br, Txt } from "verstak"
import { App } from "models/App"
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

      $br() // =====

      Block("logo", [css.Content, css.Brand], e => {
        Txt("Logo")
      })

      $bounds({ widthGrow: 1 })
      Block("toolbar", [css.Content], e => {
        Txt("Toolbar")
        $br(); Txt("Toolbar can be multi-line")
      })

      Block("account", [css.Content, css.Unimportant], e => {
        Txt("Account")
      })

      $br() // =====

      Panel("Navigation-Bar", [css.Content])

      $bounds({ widthGrow: 1, heightGrow: 1 })
      Panel("Main-Working-Area", [css.Content, css.Important])

      Panel("Property-Inspector", [css.Content])

      $br() // =====

      $bounds({ widthGrow: 1 })
      Panel("Status-Bar", [css.Content], (e, b) => {
        b.render()
        $br()
        Txt("status bar content")
      })

      Panel("Indicator-1", [css.Content, css.Center], (e, b) => {
        b.render()
        $br()
        Txt("(1)")
      })

      Panel("Indicator-2", [css.Content, css.Center], (e, b) => {
        b.render()
        $br()
        Txt("(1)")
      })

      Panel("Indicator-3", [css.Content, css.Center], (e, b) => {
        b.render()
        $br()
        Txt("(1)")
      })
    })
  )
}
