import { Transaction } from "reactronic"
import { Block, BlockBody, PlainText, FocusModel, lineFeed, vmt } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils"
import { Icon } from "./Icon.v"

export interface FieldModel<T = string> extends FocusModel {
  icon?: string
  text: string
  options: Array<T>
  selected: T | undefined
  multiSelected: Set<T>
  position: number // scroll
  isMultiLineText: boolean
  isHotText: boolean
  inputStyle: string
}

export const Field = (body?: BlockBody<HTMLElement, FieldModel>) => (
  Block<FieldModel>({ autonomous: true, ...vmt(body), base: {
    initialize(b) {
      b.model ??= createFieldModel()
      b.native.onscroll = () => {
        b.model.position = b.native.scrollTop
      }
    },
    render(b) {
      const m = b.model
      m.icon && Icon(m.icon)
      FieldInput(m)
      FieldPopup(m)
    },
  }})
)

export function createFieldModel<T>(props?: Partial<ValuesOrRefs<FieldModel<T>>>): FieldModel<T> {
  return observableModel({
    icon: props?.icon,
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

function FieldInput(model: FieldModel) {
  return (
    PlainText(model.text, {
      key: FieldInput.name,
      initialize(b) {
        const e = b.native
        b.widthGrowth = 1
        e.tabIndex = 0
        e.contentEditable = "true"
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
      redefinedRender(b) {
        const e = b.native
        if (!model.isEditMode)
          e.innerText = model.text
        // ReactingFocuser("Focuser", e, model)
      },
    })
  )
}

const FieldPopup = (model: FieldModel) => (
  Block({ // popup itself
    key: FieldPopup.name,
    initialize(b) {
      const e = b.native
      e.style.backgroundColor = "white"
      e.style.outline = "1px solid rgba(127, 127, 127, 1)"
      e.style.outlineOffset = "-0.5px"
      e.onscroll = () => model.position = e.scrollTop
    },
    render(b) {
      const visible = b.overlayVisible = model.isEditMode
      if (visible) {
        const options = model.options
        if (options.length > 0) {
          for (const x of model.options) {
            lineFeed()
            PlainText(x)
          }
        }
        else
          PlainText("(nothing found)")
      }
    },
  })
)

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
