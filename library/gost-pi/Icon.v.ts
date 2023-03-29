import { VBand, BlockBuilder, Mode } from "verstak"
import { $theme } from "./Theme"

export function Icon(name: string, builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    VBand(builder, {
      modes: Mode.SeparateReaction,
      render(b) {
        const s = $theme.value.icon
        b.style(name)
        b.style(s.main)
      },
    })
  )
}
