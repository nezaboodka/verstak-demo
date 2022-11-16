import { Block, BlockArgs, Input, Align, asComponent, PlainText, ReactingFocuser, FocusModel, lineFeed, use, Group } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils"
import { Transaction } from "reactronic"

export interface FieldModel<T = string> extends FocusModel {
  text: string
  options: Array<T>
  selected: T | undefined
  multiSelected: Set<T>
  position: number // scroll
  isMultiLineText: boolean
  isHotText: boolean
  inputStyle: string
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
    isHotText: props?.isHotText ?? false,
    inputStyle: props?.inputStyle ?? "",
  })
}

function FieldInput(name: string, model: FieldModel) {
  return (
    PlainText(model.text, name, {
      initialize(e) {
        e.onkeydown = event => {
          const m = model
          if (isApplyKey(m, event))
            selectAllAndPreventDefault(event, e)
        }
        e.onkeyup = event => {
          const m = model
          if (isApplyKey(m, event)) {
            selectAllAndPreventDefault(event, e)
            Transaction.run(null, () => m.text = e.innerText)
          }
          else if (m.isHotText)
            Transaction.run(null, () => { m.text = e.innerText })
        }
        e.onfocus = () => {
          Transaction.run(null, () => model.isEditMode = true)
        }
        e.onblur = () => {
          Transaction.run(null, () => model.isEditMode = false)
        }
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
        if (!model.isEditMode)
          e.innerText = model.text
        // ReactingFocuser("Focuser", e, model)
      },
    })
  )
}

function FieldOptions(name: string, model: FieldModel) {
  return (
    Block(name, { // popup itself
      widthMin: "10em",
      dangling: true,
      initialize(e, b) {
        e.onscroll = () => model.position = e.scrollTop
        const focused = document.activeElement
        if (focused) {
          const bounds = focused.getBoundingClientRect()
          const x = document.body.offsetWidth - bounds.left
          if (x < document.body.offsetWidth / 2)
            e.style.right = `${document.body.offsetWidth - bounds.right}px`
          if (bounds.top > document.body.clientHeight / 2)
            e.style.bottom = `${document.body.offsetHeight - bounds.top - 1}px`
        }
      },
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
  )
}

function isApplyKey(m: FieldModel, event: KeyboardEvent): boolean {
  return event.key === "Enter" && (
    !m.isMultiLineText || event.shiftKey || event.ctrlKey || event.metaKey)
}

function selectAllAndPreventDefault(event: KeyboardEvent, e: HTMLElement): void {
  const range = document.createRange()
  range.selectNodeContents(e)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
  event.preventDefault()
}
