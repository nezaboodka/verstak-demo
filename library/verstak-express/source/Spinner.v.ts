// The below copyright notice and the license permission notice
// shall be included in all copies or substantial portions.
// Copyright (C) 2022-2024 Nezaboodka Software <contact@nezaboodka.com>
// License: https://raw.githubusercontent.com/nezaboodka/verstak/master/LICENSE
// By contributing, you agree that your contributions will be
// automatically licensed under the license referred above.

import { RxNodeDecl, Mode } from "reactronic"
import { Section, Note, El } from "verstak"
import { observableModel, ValuesOrRefs } from "./common/Utils.js"

export type SpinnerModel = {
  active: boolean
  color: string
}

export function Spinner(declaration?: RxNodeDecl<El<HTMLElement, SpinnerModel>>) {
  return (
    Section<SpinnerModel>(declaration, {
      mode: Mode.independentUpdate,
      activation: el => {
        el.model ??= composeSpinnerModel()
      },
      autorun: el => {
        const m = el.model
        m.active && Note("loading...")
      },
    })
  )
}

export function composeSpinnerModel<T>(props?: Partial<ValuesOrRefs<SpinnerModel>>): SpinnerModel
{
  return observableModel({
    active: props?.active ?? false,
    color: props?.color ?? "",
  })
}
