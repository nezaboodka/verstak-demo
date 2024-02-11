import { RxNodeDecl, Mode } from "reactronic"
import { Section, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string,
  declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Section(declaration, {
      mode: Mode.independentUpdate,
      content(b) {
        const s = Theme.actual.icon
        b.useStylingPreset(name)
        b.useStylingPreset(s.main)
      },
    })
  )
}
