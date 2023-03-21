import { Transaction } from "reactronic"
import { VSection, BlockBuilder, VNote, Mode } from "verstak"
import { observableModel } from "common/Utils"
import { $theme } from "./Theme"
import { Icon } from "./Icon.v"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(builder?: BlockBuilder<HTMLElement, ToggleModel>) {
  return (
    VSection<ToggleModel>(builder, {
      modes: Mode.SeparateReaction,
      initialize(b) {
        b.model ??= observableModel({
          label: b.builder.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(b) {
        const m = b.model
        const t = $theme.value
        const s = t.toggle
        b.style(s.main)
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, {
          render(b, base) {
            base()
            b.style(s.icon)
            b.native.style.color = m.checked ? (t.positiveColor ?? "") : "" // subscribe to ToggleModel.checked
          }
        })
        if (m.label)
          VNote(m.label, {
            render(b, base) {
              base()
              b.style(s.label)
            }
          })
      },
    })
  )
}
