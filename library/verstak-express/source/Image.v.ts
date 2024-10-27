// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { RxNodeDecl, Mode, RxNode } from "reactronic"
import { Panel, El } from "verstak"
import { observableModel } from "./common/Utils.js"

export type ImageModel = {
  source?: string
}

export function Image(declaration?: RxNodeDecl<El<HTMLElement, ImageModel>>) {
  return (
    Panel<ImageModel>(RxNode.rebased(declaration, {
      mode: Mode.independentUpdate,
      creation: el => {
        el.model ??= observableModel({ source: undefined })
      },
      script: el => {
        const m = el.model
        el.style.backgroundImage = `url(${m.source})`
        el.style.backgroundSize = "contain"
        el.style.backgroundRepeat = "no-repeat"
      },
    }))
  )
}
