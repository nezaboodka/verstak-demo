import { Block, BlockPreset, text, lbr, useBounds } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function StatusBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      useBounds({ widthGrow: 1 })
      Panel("Status", [css.Panel], (e, b) => {
        b.render() // base render
        lbr(); text("status bar content")
      })

      Panel("Ind-1", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        lbr(); text("[1]")
      })

      Panel("Ind-2", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        lbr(); text("[2]")
      })

      Panel("Ind-3", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        lbr(); text("[3]")
      })
    })
  )
}
