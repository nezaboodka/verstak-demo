import { Block, BlockPreset, Render, presetsToOptions, $, $br, $bounds } from "verstak"
import * as css from "theme/Common.css"

export function Panel(name: string,
  preset?: BlockPreset<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  preset = presetsToOptions(preset, { wrapper: render })
  return (
    Block(name, preset, (e, b) => {
      $bounds({ widthGrow: 1 })
      Block("title", [css.PanelTitle], e => {
        $(name)
      })
      $br()
    })
  )
}
