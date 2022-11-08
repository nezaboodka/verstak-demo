import { Block, BlockPreset, Render, presetsToOptions, $ } from "verstak"
import * as css from "theme/Common.css"

export function Panel(name: string,
  preset?: BlockPreset<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  preset = presetsToOptions(preset, { mixins: [css.Panel], wrapper: render })
  return (
    Block(name, preset, (e, b) => {
      $(name)
    })
  )
}
