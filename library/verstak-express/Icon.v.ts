import { Section, RxNodeDecl, Mode, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string, builder?: RxNodeDecl<El<HTMLElement, void, void>>) {
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
