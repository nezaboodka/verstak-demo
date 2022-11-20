import { ObservableObject, Transaction } from "reactronic"
import { nestedContext, tryUseContext } from "verstak"
import { ButtonStyle, DefaultButtonStyle } from "./Button.v"
import { FieldStyle, DefaultFieldStyle  } from "./Field.v"
import { IconStyle, DefaultIconStyle  } from "./Icon.v"
import { ThemeVariables } from "./ThemeVars"
import { ToggleStyle, DefaultToggleStyle } from "./Toggle.v"

export interface Theme {
  readonly button: ButtonStyle
  readonly field: FieldStyle
  readonly icon: IconStyle
  readonly toggle: ToggleStyle
}

export function useTheme(): Theme {
  return tryUseContext(GostTheme) ?? (DefaultGhostTheme ??= Transaction.run({ separation: true }, () => new GostTheme()))

}

export function nestedTheme(theme: Theme): void {
  nestedContext(GostTheme, theme)
}

export class GostTheme extends ObservableObject implements Theme, ThemeVariables {
  fillColor = "white"
  textColor = "black"
  positiveColor = "green"
  negativeColor = "red"
  borderRadius = "0.35rem"
  outlineWidth = "1px"
  outlineColor = "rgba(127, 127, 127, 0.5)"
  outlinePadding = "0.25em"
  shadow = "0.1rem 0.1rem 0.5rem 0 rgba(127, 127, 127, 0.5)"

  button = new DefaultButtonStyle(this)
  field = new DefaultFieldStyle(this)
  icon = new DefaultIconStyle(this)
  toggle = new DefaultToggleStyle(this)
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
