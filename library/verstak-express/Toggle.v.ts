import { Transaction } from "reactronic"
import { Section, RxNodeSpec, Note, Mode, El } from "verstak"
import { observableModel } from "common/Utils.js"
import { Theme } from "./Theme.js"
import { Icon } from "./Icon.v.js"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(spec?: RxNodeSpec<El<HTMLElement, ToggleModel>>) {
  return (
    Section<ToggleModel>(spec, {
      mode: Mode.PinpointUpdate,
      initialize(b) {
        b.model ??= observableModel({
          label: b.node.spec.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      update(b) {
        const m = b.model
        const t = Theme.actual
        const s = t.toggle
        b.useStyle(s.main)
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, {
          update(b, base) {
            base()
            b.useStyle(s.icon)
            b.native.style.color = m.checked ? (t.positiveColor ?? "") : "" // subscribe to ToggleModel.checked
          }
        })
        if (m.label)
          Note(m.label, {
            update(b, base) {
              base()
              b.useStyle(s.label)
            }
          })
      },
    })
  )
}
