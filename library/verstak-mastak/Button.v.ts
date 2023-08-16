import { Transaction } from "reactronic"
import { Section, BlockBuilder, Note, Mode } from "verstak"
import { observableModel } from "common/Utils"
import { Theme } from "./Theme"
import { Icon } from "./Icon.v"

export interface ButtonModel {
  icon?: string
  label?: string
  action?(): void
}

export function Button(builder?: BlockBuilder<HTMLElement, ButtonModel>) {
  return (
    Section<ButtonModel>(builder, {
      mode: Mode.PinpointRebuild,
      initialize(b) {
        b.model ??= observableModel({
          icon: "fa-solid fa-square",
          label: b.node.builder.key,
        })
        b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
      },
      rebuild(b) {
        const m = b.model
        const s = Theme.actual.button
        b.useStyle(s.main)
        if (m.icon) {
          Icon(m.icon, {
            rebuild(b, base) {
              base()
              b.useStyle(s.icon)
            }
          })
        }
        if (m.label) {
          Note(m.label, {
            rebuild(b, base) {
              base()
              b.useStyle(s.label)
            }
          })
        }
      },
    })
  )
}
