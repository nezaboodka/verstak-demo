import { Transaction } from "reactronic"
import { VSection, BlockBuilder, VNote, Mode } from "verstak"
import { observableModel } from "common/Utils"
import { $theme } from "./Theme"
import { Icon } from "./Icon.v"

export interface ButtonModel {
  icon?: string
  label?: string
  action?(): void
}

export function Button(builder?: BlockBuilder<HTMLElement, ButtonModel>) {
  return (
    VSection<ButtonModel>(builder, {
      modes: Mode.SelfReactive,
      initialize(b) {
        b.model ??= observableModel({
          icon: "fa-solid fa-square",
          label: b.builder.key,
        })
        b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
      },
      render(b) {
        const m = b.model
        const s = $theme.value.button
        b.style(s.main)
        if (m.icon)
          Icon(m.icon, {
            render(b, base) {
              base()
              b.style(s.icon)
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
