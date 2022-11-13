import { Block, BlockArgs, Input, To, asComponent, PlainText, ReactingFocuser, FocusModel } from "verstak"
import { observableModel } from "common/Utils"
import { Transaction } from "reactronic"

export interface DropdownModel<T = string> extends FocusModel {
  text: T
  options: Array<T>
  selected: T | undefined
  multiSelected: Set<T>
  position: number // scroll
  isMultiLineText: boolean
  inputStyle: string
}

export function InputField(name: string, args?: BlockArgs<HTMLElement, DropdownModel>) {
  return (
    Block<DropdownModel>(name ?? "", asComponent(args, {
      widthMin: "3em",
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model ??= createLocalModel()
        e.onscroll = () => b.model.position = e.scrollTop
      },
      render(e, b) {
        PlainText("", "Input", {
          widthGrowth: To.Fit,
          initialize(e) {
            e.onkeydown = event => {
              if (event.key === "Enter" && !b.model.isMultiLineText) {
                selectAllAndPreventDefault(event, e)
                b.model.text = e.innerHTML
              }
            }
            e.onfocus = () => {
              Transaction.run(null, () => b.model.isEditMode = true)
            }
            e.onblur = () => {
              Transaction.run(null, () => b.model.isEditMode = false)
            }
          },
          render(e) {
            e.tabIndex = 0
            e.contentEditable = "true"
            e.style.outline = b.model.isEditMode ? "2px solid rgba(255, 127, 127, 1)" : "1px solid rgba(127, 127, 127, 0.25)"
            e.style.padding = "0 0.25em"
            e.style.borderRadius = "0.2rem"
            e.style.whiteSpace = "nowrap"
            e.style.minWidth = "3em"
            e.style.minHeight = "1.2em"
            // ReactingFocuser("Focuser", e, b.model)
          },
        })
      },
    }))
  )
}

function createLocalModel(): DropdownModel<any>
{
  return observableModel({
    text: "",
    options: ["Value1", "Value2", "Value3"],
    selected: undefined,
    multiSelected: new Set<string>(),
    focused: false,
    position: 0,
    isMultiLineText: true,
    isEditMode: false,
    inputStyle: "",
  })
}

function selectAllAndPreventDefault(event: KeyboardEvent, e: HTMLElement): void {
  const range = document.createRange()
  range.selectNodeContents(e)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
  event.preventDefault()
}
