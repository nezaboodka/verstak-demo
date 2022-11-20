import { Transaction } from "reactronic"
import { Block, BlockBody, PlainText, vmt } from "verstak"
import { observableModel } from "common/Utils"
import { useStyles } from "./Styles"
import { Icon } from "./Icon.v"

export interface ButtonModel {
  icon?: string
  label?: string
  action?(): void
}

export const Button = (body?: BlockBody<HTMLElement, ButtonModel>) => (
  Block<ButtonModel>({ autonomous: true, ...vmt(body), base: {
    initialize(b) {
      b.model ??= observableModel({
        icon: "fa-solid fa-fw fa-square",
        label: b.body.key,
      })
      b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
    },
    render(b) {
      const m = b.model
      const s = useStyles()
      b.style(s.buttonStyle)
      if (m.icon)
        Icon(m.icon, b => b.style(s.buttonIconStyle))
      if (m.label)
        PlainText(m.label, b => b.style(s.buttonLabelStyle))
    },
  }})
)
