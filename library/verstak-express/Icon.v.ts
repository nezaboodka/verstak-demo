import { RxNodeDecl, Mode } from "reactronic"
import { Section, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string,
  declaration?: RxNodeDecl<El<HTMLElement, void, void>>) {
  return (
    Section(declaration, {
      mode: Mode.IndependentUpdate,
      update(b) {
        const s = Theme.actual.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
