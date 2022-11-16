import { Transaction } from "reactronic"
import { Block, BlockBody, asComponent } from "verstak"
import { observableModel } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(name: string, body?: BlockBody<HTMLElement, ToggleModel>) {
  return (
    Block<ToggleModel>(name ?? "", asComponent(body, {
      initialize(b) {
        // Model is either taken from parameter or created internally
        b.model ??= observableModel({ label: name, checked: true, color: "green" })
        const e = b.native
        e.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(b) {
        const m = b.model
        const e = b.native
        e.className = s.Clickable // style is not inside "initialize", because of theming
        // Render with subscribing to ToggleModel.checked
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, "Icon", (b, base) => {
          base()
          b.native.style.color = m.checked ? (m.color ?? "") : ""
        })
        if (m.label)
          Label(m.label, "Label")
      },
    }))
  )
}
