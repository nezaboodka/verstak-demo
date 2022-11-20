import { ObservableObject, raw } from "reactronic"

export interface ThemeVariables {
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

export class ComponentStyles extends ObservableObject {
  @raw protected readonly $: ThemeVariables

  constructor(variables: ThemeVariables) {
    super()
    this.$ = variables
  }
}
