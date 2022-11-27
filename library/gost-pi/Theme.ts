import { Transaction } from "reactronic"
import { Context } from "verstak"
import { ThemeVars } from "./theme/Styling"
import { ButtonStyling, DefaultButtonStyling } from "./theme/Button.s"
import { FieldStyling, DefaultFieldStyling  } from "./theme/Field.s"
import { IconStyling, DefaultIconStyling  } from "./theme/Icon.s"
import { ToggleStyling, DefaultToggleStyling } from "./theme/Toggle.s"

export interface Theme extends ThemeVars {
  readonly button: ButtonStyling
  readonly field: FieldStyling
  readonly icon: IconStyling
  readonly toggle: ToggleStyling
}

export class BasicGostTheme implements Theme {
  name = "Default Theme"
  fillColor = "white"
  textColor = "black"
  positiveColor = "green"
  negativeColor = "red"
  borderRadius = "0.35rem"
  outlineWidth = "1px"
  outlineColor = "rgba(127, 127, 127, 0.5)"
  outlinePadding = "0.25em"
  shadow = "0.1rem 0.1rem 0.5rem 0 rgba(127, 127, 127, 0.5)"
  button = new DefaultButtonStyling(this)
  field = new DefaultFieldStyling(this)
  icon = new DefaultIconStyling(this)
  toggle = new DefaultToggleStyling(this)
}

export const ActualTheme = new Context<Theme>(
  Transaction.run({ separation: true }, () => new BasicGostTheme()))
