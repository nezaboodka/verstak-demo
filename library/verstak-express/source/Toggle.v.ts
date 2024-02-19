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
      onCreate: el => {
        el.model ??= observableModel({
          label: RxNode.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        el.native.onclick = () => Transaction.run(null, () => el.model.checked = !el.model.checked)
      },
      onChange: el => {
        const m = el.model
        const theme = Theme.current
        const toggleTheme = theme.toggle
        el.useStylingPreset(toggleTheme.main)
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, {
          onChange: (el, base) => {
            base()
            el.useStylingPreset(toggleTheme.icon)
            el.style.color = m.checked ? (theme.positiveColor ?? "") : "" // subscribe to ToggleModel.checked
          },
        })
        if (m.label)
          Note(m.label, false, {
            onChange: (el, base) => {
              base()
              el.useStylingPreset(toggleTheme.label)
            },
          })
      },
    })
  )
}
