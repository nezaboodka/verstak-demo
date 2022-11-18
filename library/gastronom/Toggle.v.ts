import { Transaction } from "reactronic"
import { Block, BlockBody, asBaseFor } from "verstak"
import { observableModel } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export function Toggle(body?: BlockBody<HTMLElement, ToggleModel>) {
  return (
    Block<ToggleModel>(asBaseFor(body, {
      autonomous: true,
      initialize(b) {
        b.model ??= observableModel({
          label: b.body.key,
          checked: true,
          color: "green" }) // model is either taken from parameter or created internally
        b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
      },
      render(b) {
        b.native.className = s.Clickable // style is not inside "initialize", because of theming
        const m = b.model
        Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, (b, base) => {
          base()
          b.native.style.color = m.checked ? (m.color ?? "") : "" // subscribe to ToggleModel.checked
        })
        if (m.label)
          Label(m.label)
      },
    }))
  )
}
