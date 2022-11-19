import { Transaction } from "reactronic"
import { Block, BlockBody, vmt } from "verstak"
import { observableModel } from "common/Utils"
import { Icon } from "./Icon.v"
import { Label } from "./Label.v"
import * as s from "themes/Common.s"

export interface ButtonModel {
  icon?: string
  label?: string
  action?(): void
}

export const Button = (body?: BlockBody<HTMLElement, ButtonModel>) => (
  Block<ButtonModel>({ autonomous: true, ...vmt(body), base: {
    initialize(b) {
      b.model ??= observableModel({
        icon: "fa fa-solid square",
        label: b.body.key,
      })
      b.native.onclick = () => Transaction.run(null, () => b.model.action?.())
    },
    render(b) {
      b.native.className = s.Clickable // style is not inside "initialize", because of theming
      const m = b.model
      if (m.icon)
        Icon(m.icon)
      if (m.label)
        Label(m.label)
    },
  }})
)
