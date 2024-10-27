// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { RxNodeDecl, Mode, RxNode } from "reactronic"
import { Panel, El } from "verstak"
import { Theme } from "./Theme.js"

export function Icon(name: string,
  declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Panel(RxNode.rebased(declaration, {
      mode: Mode.independentUpdate,
      triggers: { name },
      script: el => {
        const theme = Theme.current.icon
        el.useStylingPreset(name)
        el.useStylingPreset(theme.main)
      },
    }))
  )
}
