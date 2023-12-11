import { Section, RxNodeDecl, Note, Mode, El } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"

export interface SpinnerModel {
  active: boolean
  color: string
}

export function Spinner(decl?: RxNodeDecl<El<HTMLElement, SpinnerModel>>) {
  return (
    Section<SpinnerModel>(decl, {
      mode: Mode.PinpointUpdate,
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
