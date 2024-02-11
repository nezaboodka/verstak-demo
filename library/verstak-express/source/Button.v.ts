// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { RxNodeDecl, Mode, RxNode } from "reactronic"
import { Section, Note, El, OnClick } from "verstak"
import { observableModel } from "./common/Utils.js"
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
      mode: Mode.independentUpdate,
      activation(b) {
        b.model ??= observableModel({
          icon: "fa-solid fa-square",
          label: RxNode.key,
        })
      },
      content(b) {
        const m = b.model
        const s = Theme.actual.button
        b.useStylingPreset(s.main)
        if (m.icon) {
          Icon(m.icon, {
            content(b, base) {
              base()
              b.useStylingPreset(s.icon)
            },
          })
        }
        if (m.label) {
          Note(m.label, {
            content(b, base) {
              base()
              b.useStylingPreset(s.label)
            },
          })
        }
        OnClick(b.native, m.action)
      },
    })
  )
}
