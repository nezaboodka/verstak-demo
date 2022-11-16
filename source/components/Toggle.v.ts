import { Transaction } from "reactronic"
import { Block, BlockArgs, asComponent } from "verstak"
import { observableModel } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(name: string, args?: BlockArgs<HTMLElement, ToggleModel>) {
  return (
    Block<ToggleModel>(name ?? "", asComponent(args, {
      initialize(e, b) {
        // Model is either taken from parameter or created internally
        b.model ??= observableModel({ label: name, checked: true, color: "green" })
        e.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(e, b) {
        const m = b.model
        // Style is not inside "initialize", because of theming
        e.className = s.Clickable
        // Render with subscribing to ToggleModel.checked
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, "Icon", {
          render(e, b, base) {
            base()
            e.style.color = m.checked ? (m.color ?? "") : ""
          }
        })
        if (m.label)
          Label(m.label, "Label")
      },
    }))
  )
}
