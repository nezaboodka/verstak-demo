import { Block, BlockPreset, $, $br, $bounds } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function StatusBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      $bounds({ widthGrow: 1 })
      Block("Status", [css.Panel], (e, b) => {
        b.render() // base render
        $br()
        $("status bar content")
      })

      Panel("Ind-1", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[1]")
      })

      Panel("Ind-2", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[2]")
      })

      Panel("Ind-3", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        $br()
        $("[3]")
      })
    })
  )
}
