import { Section, BlockBuilder, Mode } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string, builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Section(builder, {
      mode: Mode.PinpointRebuild,
      rebuild(b) {
        const s = Theme.actual.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
