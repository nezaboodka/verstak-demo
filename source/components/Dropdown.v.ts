import { Block, Input, To } from "verstak"
import { composeModel } from "common/Utils"

export interface DropdownModel {
  focused: boolean
  filter: string
  values: Array<string>
  checked: Set<number>
  position: number // scroll
}

export function Dropdown(name: string, model?: DropdownModel) {
  return (
    Block<DropdownModel>(name ?? "", {
      widthGrowth: 1,
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model = model ?? createLocalModel()
        e.onscroll = () => b.model.position = e.scrollTop
      },
      render(e, b) {
        const m = b.model
        // Style is not inside "initialize", because of theming
        Input("Filter", {
          alignFrame: To.Fit,
          render(e, b) {
            e.style.flexGrow = "1"
            e.style.maxWidth = "auto"
            e.style.width = "100%"
            e.style.outline = "1px solid red"
          }
        })
      }
    })
  )
}

function createLocalModel(): DropdownModel
{
  return composeModel({
    focused: false,
    filter: "",
    values: ["Value1", "Value2", "Value3"],
    checked: new Set<number>([2]),
    position: 0,
  })
}
