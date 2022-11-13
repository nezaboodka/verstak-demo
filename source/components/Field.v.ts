import { Block, BlockArgs, Input, To, asComponent, PlainText, ReactingFocuser, FocusModel, lineFeed } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils"
import { Transaction } from "reactronic"

export interface FieldModel<T = string> extends FocusModel {
  text: string
  options: Array<T>
  selected: T | undefined
  multiSelected: Set<T>
  position: number // scroll
  isMultiLineText: boolean
  inputStyle: string
}

export function createFieldModel<T>(props?: Partial<ValuesOrRefs<FieldModel<T>>>): FieldModel<T>
{
  return observableModel({
    text: props?.text ?? "",
    options: props?.options ?? [],
    selected: props?.selected,
    multiSelected: props?.multiSelected ?? new Set<T>(),
    position: 0,
    isMultiLineText: props?.isMultiLineText ?? false,
    isEditMode: props?.isEditMode ?? false,
    inputStyle: props?.inputStyle ?? "",
  })
}

export function Field(name: string, args?: BlockArgs<HTMLElement, FieldModel>) {
  return (
    Block<FieldModel>(name ?? "", asComponent(args, {
      widthMin: "3em",
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model ??= createFieldModel()
        e.onscroll = () => b.model.position = e.scrollTop
      },
      render(e, b) {
        PlainText(b.model.text, "Input", {
          widthGrowth: To.Fit,
          initialize(e) {
            e.onkeydown = event => {
              if (event.key === "Enter") {
                if (!b.model.isMultiLineText || event.shiftKey || event.ctrlKey || event.metaKey) {
                  selectAllAndPreventDefault(event, e)
                  Transaction.run(null, () => b.model.text = e.innerHTML)
                }
              }
            }
            e.onfocus = () => {
              Transaction.run(null, () => b.model.isEditMode = true)
            }
            e.onblur = () => {
              Transaction.run(null, () => b.model.isEditMode = false)
            }
            e.innerText = b.model.text
          },
          render(e) {
            e.tabIndex = 0
            e.contentEditable = "true"
            e.style.outline = b.model.isEditMode ? "2px solid rgba(255, 127, 127, 1)" : "1px solid rgba(127, 127, 127, 0.25)"
            e.style.outlineOffset = "-1px"
            e.style.padding = "0 0.25em"
            e.style.borderRadius = "0.2rem"
            e.style.whiteSpace = "nowrap"
            e.style.minWidth = "3em"
            e.style.minHeight = "1em"
            // ReactingFocuser("Focuser", e, b.model)
          },
        })
        if (b.model.isEditMode) {
          lineFeed()
          PlainText(b.model.text, "Options", {
            popup: true,
          })
        }
      },
    }))
  )
}

function selectAllAndPreventDefault(event: KeyboardEvent, e: HTMLElement): void {
  const range = document.createRange()
  range.selectNodeContents(e)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
  event.preventDefault()
}
