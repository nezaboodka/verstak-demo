import { VSection, BlockBuilder } from "verstak"
import { $theme } from "./Theme"

export function Icon(name: string, builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    VSection(builder, {
      reaction: true,
      render(b) {
        const s = $theme.value.icon
        b.style(name)
        b.style(s.main)
      },
    })
  )
}
