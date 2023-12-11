import { Section, RxNodeDecl, Mode, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string, decl?: RxNodeDecl<El<HTMLElement, void, void>>) {
  return (
    Section(decl, {
      mode: Mode.PinpointUpdate,
      update(b) {
        const s = Theme.actual.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
