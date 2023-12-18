import { RxNodeDecl, Mode } from "reactronic"
import { Section, Note, El } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"

export type SpinnerModel = {
  active: boolean
  color: string
}

export function Spinner(declaration?: RxNodeDecl<El<HTMLElement, SpinnerModel>>) {
  return (
    Section<SpinnerModel>(declaration, {
      mode: Mode.IndependentUpdate,
      initialize(b) {
        b.model ??= composeSpinnerModel()
      },
      update(b) {
        const m = b.model
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
