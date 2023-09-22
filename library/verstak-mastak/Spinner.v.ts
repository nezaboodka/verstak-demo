import { Section, BlockBuilder, Note, Mode } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"

export interface SpinnerModel {
  active: boolean
  color: string
}

export function Spinner(builder?: BlockBuilder<HTMLElement, SpinnerModel>) {
  return (
    Section<SpinnerModel>(builder, {
      mode: Mode.PinpointRebuild,
      initialize(b) {
        b.model ??= composeSpinnerModel()
      },
      rebuild(b) {
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
