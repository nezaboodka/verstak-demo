import { Band, BlockBuilder, Mode } from "verstak"
import { $theme } from "./Theme"

export function Icon(name: string, builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Band(builder, {
      modes: Mode.PinpointRefresh,
      render(b) {
        const s = $theme.value.icon
        b.style(name)
        b.style(s.main)
      },
    })
  )
}
