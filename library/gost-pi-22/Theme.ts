import { ObservableObject, Transaction } from "reactronic"
import { nestedContext, tryUseContext } from "verstak"
import { ThemeVars } from "./Styling"
import { ButtonStyling, DefaultButtonStyling } from "./Button.v"
import { FieldStyling, DefaultFieldStyling  } from "./Field.v"
import { IconStyling, DefaultIconStyling  } from "./Icon.v"
import { ToggleStyling, DefaultToggleStyling } from "./Toggle.v"

export interface Theme extends ThemeVars {
  readonly button: ButtonStyling
  readonly field: FieldStyling
  readonly icon: IconStyling
  readonly toggle: ToggleStyling
}

export function useTheme(): Theme {
  return tryUseContext(GostTheme) ?? (DefaultGhostTheme ??= Transaction.run({ separation: true }, () => new GostTheme()))
}

export function nestedTheme(theme: Theme): void {
  nestedContext(GostTheme, theme)
}

export class GostTheme extends ObservableObject implements Theme {
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

let DefaultGhostTheme: GostTheme | undefined = undefined

// export abstract class GostTheme extends ObservableObject implements Theme, ThemeVariables {
//   abstract fillColor: string
//   abstract textColor: string
//   abstract positiveColor: string
//   abstract negativeColor: string
//   abstract borderRadius: string
//   abstract outlineWidth: string
//   abstract outlineColor: string
//   abstract outlinePadding: string
//   abstract shadow: string

//   abstract button: ButtonStyle
//   abstract field: FieldStyle
//   abstract icon: IconStyle
//   abstract toggle: ToggleStyle
// }
