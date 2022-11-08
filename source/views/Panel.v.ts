import { Block, BlockPreset, Render, presetsToOptions, text } from "verstak"
import * as css from "theme/Common.css"

export function Panel(name: string,
  preset?: BlockPreset<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  preset = presetsToOptions(preset, { wrapper: render })
  return (
    Block(name, preset, (e, b) => {
      Block("title", { widthGrow: 1, use: [css.PanelTitle] }, e => {
        text(name)
      })
    })
  )
}
