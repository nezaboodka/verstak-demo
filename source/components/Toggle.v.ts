import { Ref, Transaction } from "reactronic"
import { Block } from "verstak"
import { compose } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ToggleModel {
  label: string
  checked: boolean
}

export function Toggle(name: string, model?: ToggleModel) {
  return (
    Block<ToggleModel>(name ?? "", {
      initialize(e, b) {
        b.model = model ?? compose({ label: "Sample Toggle", checked: true })
        e.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(e, b) {
        const m = b.model
        e.className = s.Clickable
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, "Icon")
        Label(m.label, "Label")
      }
    })
  )
}
