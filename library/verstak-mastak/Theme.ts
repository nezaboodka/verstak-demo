import { Transaction } from "reactronic"
import { ContextVariable } from "verstak"
import { AbstractTheme } from "./theme/Styling"
import { ButtonStyling, DefaultButtonStyling } from "./theme/Button.s"
import { FieldStyling, DefaultFieldStyling  } from "./theme/Field.s"
import { IconStyling, DefaultIconStyling  } from "./theme/Icon.s"
import { ToggleStyling, DefaultToggleStyling } from "./theme/Toggle.s"

export { type ButtonStyling, type DefaultButtonStyling } from "./theme/Button.s"
export { type FieldStyling, type DefaultFieldStyling  } from "./theme/Field.s"
export { type IconStyling, type DefaultIconStyling  } from "./theme/Icon.s"
export { type ToggleStyling, type DefaultToggleStyling } from "./theme/Toggle.s"

export interface Theme extends AbstractTheme {
  readonly button: ButtonStyling
  readonly field: FieldStyling
  readonly icon: IconStyling
  readonly toggle: ToggleStyling
}

export class MastakTheme implements Theme {
  private static readonly gCurrent = new ContextVariable<Theme>(
    Transaction.run({ separation: true }, () => new MastakTheme()))

  static get current(): Theme {
    return MastakTheme.gCurrent.value
  }
  static set current(value: Theme) {
    MastakTheme.gCurrent.value = value
  }

  name = "Default Gost Theme"
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
