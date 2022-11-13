import { Block, BlockArgs, Input, To, asComponent, PlainText, ReactingFocuser, FocusModel, lineFeed, use, Group } from "verstak"
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
  isHotText: boolean
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
    isHotText: props?.isHotText ?? false,
  })
}

export function Field(name: string, args?: BlockArgs<HTMLElement, FieldModel>) {
  return (
    Block<FieldModel>(name ?? "", asComponent(args, {
      widthMin: "3em",
      initialize(e, b) {
        b.model ??= createFieldModel()
        e.onscroll = () => b.model.position = e.scrollTop
      },
      render(e, b) {
        FieldInput("Input", b.model)
        if (b.model.isEditMode) {
          lineFeed()
          FieldOptions("Options", b.model)
        }
      },
    }))
  )
}

export function FieldInput(name: string, model: FieldModel) {
  return (
    PlainText(model.text, name, {
      widthGrowth: To.Fit,
      initialize(e) {
        e.onkeydown = event => {
          const m = model
          if (event.key === "Enter" && (
            !m.isMultiLineText || event.shiftKey ||
            event.ctrlKey || event.metaKey)) {
            selectAllAndPreventDefault(event, e)
          }
        }
        e.onkeyup = event => {
          const m = model
          if (event.key === "Enter" && (
            !m.isMultiLineText || event.shiftKey ||
            event.ctrlKey || event.metaKey)) {
            selectAllAndPreventDefault(event, e)
            Transaction.run(null, () => m.text = e.innerText)
          }
          else if (m.isHotText)
            Transaction.run(null, () => {
              console.log(`"${m.text}" -> "${e.innerText}"`)
              m.text = e.innerText
            })
        }
        e.onfocus = () => {
          Transaction.run(null, () => model.isEditMode = true)
        }
        e.onblur = () => {
          Transaction.run(null, () => model.isEditMode = false)
        }
        e.innerText = model.text
      },
      render(e) {
        e.tabIndex = 0
        e.contentEditable = "true"
        e.style.outline = model.isEditMode ? "2px solid rgba(255, 127, 127, 1)" : "1px solid rgba(127, 127, 127, 0.25)"
        e.style.outlineOffset = "-1px"
        e.style.borderRadius = "0.2rem"
        e.style.padding = "0.25em"
        e.style.whiteSpace = "nowrap"
        e.style.minWidth = "3em"
        e.style.minHeight = "1em"
        // ReactingFocuser("Focuser", e, model)
      },
    })
  )
}

function FieldOptions(name: string, model: FieldModel) {
  return (
    Block(name, {
      widthGrowth: 1,
      initialize(e, b) {
        e.onscroll = () => model.position = e.scrollTop
        e.style.height = "0"
      },
      render(e, b) {
        Block("Popup", {
          widthGrowth: 1,
          widthMin: "20em",
          popup: true,
          render(e, b) {
            e.style.outline = "2px solid rgba(255, 127, 127, 1)"
            e.style.outlineOffset = "-1px"
            e.style.borderRadius = "0.2rem"
            e.style.padding = "0.25em"
            e.style.backgroundColor = "white"
            const options = model.options
            if (options.length > 0) {
              for (const x of model.options) {
                lineFeed()
                PlainText(x, x)
              }
            }
            else
              PlainText("nothing found")
          },
        })
      },
    })
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
