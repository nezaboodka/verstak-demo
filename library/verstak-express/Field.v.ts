import { Transaction } from "reactronic"
import { Section, RxNodeSpec, Note, FocusModel, FocuserReaction, startNewRow, Mode, El } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"
import { Theme, FieldStyling } from "./Theme.js"
import { Icon } from "./Icon.v.js"

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

export function Field(spec?: RxNodeSpec<El<HTMLElement, FieldModel>>) {
  return (
    Section<FieldModel>(spec, {
      mode: Mode.PinpointUpdate,
      initialize(b) {
        b.model ??= composeFieldModel()
        b.native.dataForSensor.focus = b.model
        b.native.onscroll = () => {
          b.model.position = b.native.scrollTop
        }
      },
      update(b) {
        const m = b.model
        const s = Theme.actual.field
        b.useStyle(s.main)
        if (m.icon)
          Icon(m.icon, {
            update(b, base) {
              base()
              b.useStyle(s.icon)
            }
          })
        FieldInput(m, s)
        FieldPopup(m, s)
      },
    })
  )
}

export function composeFieldModel<T>(props?: Partial<ValuesOrRefs<FieldModel<T>>>): FieldModel<T> {
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

function FieldInput(model: FieldModel, s: FieldStyling) {
  return (
    Note(model.text, {
      key: FieldInput.name,
      initialize(b, base) {
        const e = b.native
        b.useStyle(s.input)
        b.widthGrowth = 1
        e.tabIndex = 0
        e.contentEditable = "true"
        e.dataForSensor.focus = model
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
        base()
      },
      update(b) {
        const e = b.native
        if (!model.isEditMode)
          e.innerText = model.text
        FocuserReaction("focuser", e, model)
      },
    })
  )
}

function FieldPopup(model: FieldModel, s: FieldStyling) {
  return (
    Section({
      key: FieldPopup.name,
      initialize(b) {
        const e = b.native
        e.onscroll = () => model.position = e.scrollTop
      },
      update(b) {
        b.useStyle(s.popup)
        const visible = b.overlayVisible = model.isEditMode
        if (visible) {
          const options = model.options
          if (options.length > 0) {
            for (const x of model.options) {
              startNewRow()
              Note(x, {
                key: x,
                initialize(b) {
                  b.contentWrapping = false
                },
              })
            }
          }
          else
            Note("(nothing)", { key: "(nothing)" })
        }
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
