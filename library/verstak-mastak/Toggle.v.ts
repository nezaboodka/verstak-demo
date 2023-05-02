import { Transaction } from "reactronic"
import { Band, BlockBuilder, Note, Mode } from "verstak"
import { observableModel } from "common/Utils"
import { Theme } from "./Theme"
import { Icon } from "./Icon.v"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(builder?: BlockBuilder<HTMLElement, ToggleModel>) {
  return (
    Band<ToggleModel>(builder, {
      mode: Mode.PinpointRefresh,
      initialize(b) {
        b.model ??= observableModel({
          label: b.node.builder.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(b) {
        const m = b.model
        const t = Theme.actual
        const s = t.toggle
        b.useStyle(s.main)
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, {
          render(b, base) {
            base()
            b.useStyle(s.icon)
            b.native.style.color = m.checked ? (t.positiveColor ?? "") : "" // subscribe to ToggleModel.checked
          }
        })
        if (m.label)
          Note(m.label, {
            render(b, base) {
              base()
              b.useStyle(s.label)
            }
          })
      },
    })
  )
}
