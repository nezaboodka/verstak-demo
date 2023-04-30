import { Transaction } from "reactronic"
import { Band, BlockBuilder, Note, Mode } from "verstak"
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
    Band<ButtonModel>(builder, {
      modes: Mode.IndependentRerendering,
      initialize(b) {
        b.model ??= observableModel({
          icon: "fa-solid fa-square",
          label: b.descriptor.builder.key,
        })
        b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
      },
      render(b) {
        const m = b.model
        const s = $theme.value.button
        b.style(s.main)
        if (m.icon)
          Icon(m.icon, {
            render(b, original) {
              original()
              b.style(s.icon)
            }
          })
        if (m.label)
          Note(m.label, {
            render(b, original) {
              original()
              b.style(s.label)
            }
          })
      },
    })
  )
}
