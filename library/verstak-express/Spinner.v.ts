import { Section, RxNodeSpec, Note, Mode, El } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"

export interface SpinnerModel {
  active: boolean
  color: string
}

export function Spinner(spec?: RxNodeSpec<El<HTMLElement, SpinnerModel>>) {
  return (
    Section<SpinnerModel>(spec, {
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
