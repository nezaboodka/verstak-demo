import { Block, BlockArgs, Input, To, asComponent } from "verstak"
import { composeModel } from "common/Utils"

export interface DropdownModel {
  focused: boolean
  filter: string
  values: Array<string>
  checked: Set<number>
  position: number // scroll
}

export function Dropdown(name: string, args?: BlockArgs<HTMLElement, DropdownModel>) {
  return (
    Block<DropdownModel>(name ?? "", asComponent(args, {
      widthGrowth: 1,
      widthMin: "3em",
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model ??= createLocalModel()
        e.onscroll = () => b.model.position = e.scrollTop
      },
      render(e, b) {
        const m = b.model
        // Style is not inside "initialize", because of theming
        Input("Filter", {
          render(e, b) {
            e.style.flexGrow = "1"
            e.style.width = "100%"
            e.style.outline = "1px solid rgba(127, 127, 127, 0.25)"
            e.style.padding = "0 0.25em"
            e.style.borderRadius = "0.25rem"
            e.placeholder = "Search..."
          }
        })
      },
    }))
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
