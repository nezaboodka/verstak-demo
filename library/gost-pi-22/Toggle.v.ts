import { Transaction } from "reactronic"
import { Block, BlockBody, PlainText, vmt } from "verstak"
import { observableModel } from "common/Utils"
import { Icon } from "./Icon.v"
import { useStyles } from "./Styles"

export interface ToggleModel {
  label?: string
  checked?: boolean
  color?: string
}

export const Toggle = (body?: BlockBody<HTMLElement, ToggleModel>) => (
  Block<ToggleModel>({ autonomous: true, ...vmt(body), base: {
    initialize(b) {
      b.model ??= observableModel({
        label: b.body.key,
        checked: true,
        color: "green" }) // model is either taken from parameter or created internally
      b.native.onclick = () => Transaction.run(null, () => b.model.checked = !b.model.checked)
    },
    render(b) {
      const m = b.model
      const s = useStyles()
      b.style(s.toggleStyle)
      Icon(`fa-solid fa-toggle-${m.checked ? "on" : "off"}`, b => {
        b.style(s.toggleIconStyle)
        b.native.style.color = m.checked ? (m.color ?? "") : "" // subscribe to ToggleModel.checked
      })
      if (m.label)
        PlainText(m.label, b => b.style(s.toggleLabelStyle))
    },
  }})
)
