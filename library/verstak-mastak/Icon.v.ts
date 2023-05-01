import { Band, BlockBuilder, Mode } from "verstak"
import { $theme } from "./Theme"

export function Icon(name: string, builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Band(builder, {
      mode: Mode.PinpointRefresh,
      render(b) {
        const s = $theme.value.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
