import { ObservableObject, raw } from "reactronic"

export interface ThemeVars {
  fillColor: string
  textColor: string
  positiveColor: string
  negativeColor: string
  borderRadius: string
  outlineWidth: string
  outlineColor: string
  outlinePadding: string
  shadow: string
}

export class Styling extends ObservableObject {
  @raw protected readonly $: ThemeVars

  constructor(variables: ThemeVars) {
    super()
    this.$ = variables
  }
}
