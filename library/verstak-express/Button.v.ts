import { RxNodeDecl, Mode, RxNode } from "reactronic"
import { Section, Note, El, OnClick } from "verstak"
import { observableModel } from "common/Utils.js"
import { Theme } from "./Theme.js"
import { Icon } from "./Icon.v.js"

export type ButtonModel = {
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
          label: RxNode.key,
        })
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
        OnClick(b.native, m.action)
      },
    })
  )
}
