import { Transaction } from "reactronic"
import { Block, BlockBody, baseFor } from "verstak"
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
    Block<ToggleModel>(name ?? "",
      baseFor(body, {
        initialize(b) {
          b.model ??= observableModel({ label: name, checked: true, color: "green" }) // model is either taken from parameter or created internally
          b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
        },
        render(b) {
          b.native.className = s.Clickable // style is not inside "initialize", because of theming
          const m = b.model
          Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, "Icon", (b, base) => {
            base()
            b.native.style.color = m.checked ? (m.color ?? "") : "" // subscribe to ToggleModel.checked
          })
          if (m.label)
            Label(m.label, "Label")
        },
      })
    )
  )
}
