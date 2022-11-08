import { Block, BlockArgs, $, section } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function StatusBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, args, (e, b) => {
      Panel("Status", { widthGrow: 1, use: [css.Panel] }, (e, b) => {
        b.render() // base render
        section(s => $`status bar content`)
      })

      Panel("Ind-1", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        section(s => $`[1]`)
      })

      Panel("Ind-2", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        section(s => $`[2]`)
      })

      Panel("Ind-3", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        section(s => $`[3]`)
      })
    })
  )
}
