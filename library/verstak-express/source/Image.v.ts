// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { RxNodeDecl, Mode } from "reactronic"
import { Section, El } from "verstak"
import { observableModel } from "./common/Utils.js"

export type ImageModel = {
  source?: string
}

export function Image(declaration?: RxNodeDecl<El<HTMLElement, ImageModel>>) {
  return (
    Section<ImageModel>(declaration, {
      mode: Mode.independentUpdate,
      activation: el => {
        el.model ??= observableModel({ source: undefined })
      },
      autorun: el => {
        const m = el.model
        el.native.style.backgroundImage = `url(${m.source})`
        el.native.style.backgroundSize = "contain"
        el.native.style.backgroundRepeat = "no-repeat"
      },
    })
  )
}
