import { Transaction, RxNodeDecl, Mode } from "reactronic"
import { Section, Note, El } from "verstak"
import { observableModel } from "common/Utils.js"
import { Theme } from "./Theme.js"
import { Icon } from "./Icon.v.js"

export interface ButtonModel {
  icon?: string
  label?: string
  action?(): void
}

export function Button(declaration?: RxNodeDecl<El<HTMLElement, ButtonModel>>) {
  return (
    Section<ButtonModel>(declaration, {
      mode: Mode.IndependentUpdate,
      initialize(b) {
        b.model ??= observableModel({
          icon: "fa-solid fa-square",
          label: b.node.declaration.key,
        })
        b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
      },
      update(b) {
        const m = b.model
        const s = Theme.actual.button
        b.useStyle(s.main)
        if (m.icon) {
          Icon(m.icon, {
            update(b, base) {
              base()
              b.useStyle(s.icon)
            }
          })
        }
        if (m.label) {
          Note(m.label, {
            update(b, base) {
              base()
              b.useStyle(s.label)
            }
          })
        }
      },
    })
  )
}
