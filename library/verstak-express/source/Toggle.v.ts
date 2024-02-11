// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { Transaction, RxNodeDecl, Mode, RxNode } from "reactronic"
import { Section, Note, El } from "verstak"
import { observableModel } from "./common/Utils.js"
import { Theme } from "./Theme.js"
import { Icon } from "./Icon.v.js"

export type ToggleModel = {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(declaration?: RxNodeDecl<El<HTMLElement, ToggleModel>>) {
  return (
    Section<ToggleModel>(declaration, {
      mode: Mode.independentUpdate,
      activation(b) {
        b.model ??= observableModel({
          label: RxNode.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      content(b) {
        const m = b.model
        const t = Theme.actual
        const s = t.toggle
        b.useStylingPreset(s.main)
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, {
          content(b, base) {
            base()
            b.useStylingPreset(s.icon)
            b.native.style.color = m.checked ? (t.positiveColor ?? "") : "" // subscribe to ToggleModel.checked
          },
        })
        if (m.label)
          Note(m.label, {
            content(b, base) {
              base()
              b.useStylingPreset(s.label)
            },
          })
      },
    })
  )
}
