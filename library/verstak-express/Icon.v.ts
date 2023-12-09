import { Section, RxNodeSpec, Mode, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string, spec?: RxNodeSpec<El<HTMLElement, void, void>>) {
  return (
    Section(spec, {
      mode: Mode.PinpointUpdate,
      update(b) {
        const s = Theme.actual.icon
        b.useStyle(name)
        b.useStyle(s.main)
      },
    })
  )
}
