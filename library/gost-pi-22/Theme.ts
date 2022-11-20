import { Transaction } from "reactronic"
import { nestedContext, tryUseContext } from "verstak"
import { StylingParams } from "./Styling"
import { ButtonStyling, DefaultButtonStyling } from "./Button.v"
import { FieldStyling, DefaultFieldStyling  } from "./Field.v"
import { IconStyling, DefaultIconStyling  } from "./Icon.v"
import { ToggleStyling, DefaultToggleStyling } from "./Toggle.v"

export interface Theme extends StylingParams {
  readonly button: ButtonStyling
  readonly field: FieldStyling
  readonly icon: IconStyling
  readonly toggle: ToggleStyling
}

export function useTheme(): Theme {
  return tryUseContext(GostTheme) ?? (DefaultGostTheme ??= Transaction.run({ separation: true }, () => new GostTheme()))
}

export function nestedTheme(theme: Theme): void {
  nestedContext(GostTheme, theme)
}

export class GostTheme implements Theme {
  readonly fillColor = "white"
  readonly textColor = "black"
  readonly positiveColor = "green"
  readonly negativeColor = "red"
  readonly borderRadius = "0.35rem"
  readonly outlineWidth = "1px"
  readonly outlineColor = "rgba(127, 127, 127, 0.5)"
  readonly outlinePadding = "0.25em"
  readonly shadow = "0.1rem 0.1rem 0.5rem 0 rgba(127, 127, 127, 0.5)"
  readonly button = new DefaultButtonStyling(this)
  readonly field = new DefaultFieldStyling(this)
  readonly icon = new DefaultIconStyling(this)
  readonly toggle = new DefaultToggleStyling(this)
}

let DefaultGostTheme: GostTheme | undefined = undefined

// export abstract class GostTheme extends ObservableObject implements Theme {
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
