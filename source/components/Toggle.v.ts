import { Ref, Transaction } from "reactronic"
import { Block } from "verstak"
import { compose } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ToggleModel {
  label: string
  checked: boolean
  color: string
}

export function Toggle(name: string, model?: ToggleModel) {
  return (
    Block<ToggleModel>(name ?? "", {
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model = model ?? compose({ label: "Sample Toggle", checked: true, color: "green" })
        e.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(e, b) {
        const m = b.model
        // Style is not inside "initialize", because of theming
        e.className = s.Clickable
        // Render with subscribing to ToggleModel.checked
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, "Icon", {
          override(e, b) {
            b.render()
            e.style.color = m.checked ? m.color : ""
          }
        })
        Label(m.label, "Label")
      }
    })
  )
}
