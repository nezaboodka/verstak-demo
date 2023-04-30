import { Band, BlockBuilder, Note, Mode } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils"

export interface SpinnerModel {
  active: boolean
  color: string
}

export function Spinner(builder?: BlockBuilder<HTMLElement, SpinnerModel>) {
  return (
    Band<SpinnerModel>(builder, {
      modes: Mode.IndependentRerendering,
      initialize(b) {
        b.model ??= createLocalModel()
      },
      render(b) {
        const m = b.model
        m.active && Note("loading...")
      },
    })
  )
}

export function createLocalModel<T>(props?: Partial<ValuesOrRefs<SpinnerModel>>): SpinnerModel
{
  return observableModel({
    active: props?.active ?? false,
    color: props?.color ?? "",
  })
}
