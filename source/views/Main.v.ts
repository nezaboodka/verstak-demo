import { Block, BlockOptions, $, $br, $bounds} from "verstak"
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
        $("Logo")
      })

      $bounds({ widthGrow: 1 })
      Block("toolbar", [css.Content], e => {
        $("Toolbar")
        $br()
        $("Toolbar can be multi-line")
      })

      Block("account", [css.Content, css.Unimportant], e => {
        $("Account")
      })

      $br() // =====

      Panel("Navigation-Bar", [css.Content])

      $bounds({ widthGrow: 1, heightGrow: 1 })
      Panel("Main-Working-Area", [css.Content, css.Important])

      Panel("Property-Inspector", [css.Content])

      $br() // =====

      $bounds({ widthGrow: 1 })
      Panel("Status-Bar", [css.Content], (e, b) => {
        b.render() // base render
        $br()
        $("status bar content")
      })

      Panel("Ind-1", [css.Content, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[1]")
      })

      Panel("Ind-2", [css.Content, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[2]")
      })

      Panel("Ind-3", [css.Content, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[3]")
      })
    })
  )
}
