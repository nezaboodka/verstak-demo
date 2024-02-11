import { RxNodeDecl, Mode } from "reactronic"
import { Section, Note, FocusModel, OnFocus, startNewRow, El, Handler, KeyboardSensor, KeyboardModifiers } from "verstak"
import { observableModel, ValuesOrRefs } from "common/Utils.js"
import { Theme, FieldStyling } from "./Theme.js"
import { Icon } from "./Icon.v.js"

export type FieldModel<T = string> = FocusModel & {
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

export function Field(declaration?: RxNodeDecl<El<HTMLElement, FieldModel>>) {
  return (
    Section<FieldModel>(declaration, {
      mode: Mode.independentUpdate,
      initialize(b) {
        b.model ??= composeFieldModel()
        b.native.dataForSensor.focus = b.model
      },
      update(b) {
        const m = b.model
        const s = Theme.actual.field
        b.useStylingPreset(s.main)
        if (m.icon)
          Icon(m.icon, {
            update(b, base) {
              base()
              b.useStylingPreset(s.icon)
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
    position: props?.position ?? 0,
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
        b.useStylingPreset(s.input)
        b.widthRange = { growth: 1 }
        e.tabIndex = 0
        e.contentEditable = "true"
        e.dataForSensor.focus = model
        base()
      },
      update(b) {
        const e = b.native
        if (!model.isEditMode)
          e.innerText = model.text
        Handler(() => {
          const keyboard = e.sensors.keyboard
          if (keyboard.down) {
            if (isApplyKey(model, keyboard))
              selectAllAndPreventDefault(e, keyboard)
          }
          if (keyboard.up) {
            if (isApplyKey(model, keyboard)) {
              selectAllAndPreventDefault(e, keyboard)
              model.text = e.innerText
            }
            else if (model.isHotText)
              model.text = e.innerText
          }
        })
        OnFocus(e, model)
      },
    })
  )
}

function FieldPopup(model: FieldModel, s: FieldStyling) {
  return (
    Section({
      key: FieldPopup.name,
      update(b) {
        b.useStylingPreset(s.popup)
        Handler(() => model.position = b.native.sensors.scroll.y)
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

function isApplyKey(m: FieldModel, keyboard: KeyboardSensor): boolean {
  const modifiers = keyboard.modifiers
  return keyboard.down === "Enter" && (
    !m.isMultiLineText || (modifiers & KeyboardModifiers.ctrlShiftMeta) > 0)
}

function selectAllAndPreventDefault(e: HTMLElement, keyboard: KeyboardSensor): void {
  const range = document.createRange()
  range.selectNodeContents(e)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
  keyboard.preventDefault = true
}
