import { Section, ElBuilder, Mode } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string, builder?: ElBuilder<HTMLElement, void, void>) {
  return (
    Section(builder, {
      mode: Mode.PinpointUpdate,
      update(b) {
        const s = Theme.actual.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
