import { Block, BlockBody, baseFor, PlainText, FocusModel, lineFeed } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils"

export interface SpinnerModel {
  active: boolean
  color: string
}

export function Spinner(name: string, body?: BlockBody<HTMLElement, SpinnerModel>) {
  return (
    Block<SpinnerModel>(name || Spinner.name,
      baseFor(body, {
        initialize(b) {
          b.model ??= createLocalModel()
        },
        render(b, base) {
          const m = b.model
          base()
          m.active && PlainText("loading...")
        },
      })
    )
  )
}

export function createLocalModel<T>(props?: Partial<ValuesOrRefs<SpinnerModel>>): SpinnerModel
{
  return observableModel({
    active: props?.active ?? false,
    color: props?.color ?? "",
  })
}
