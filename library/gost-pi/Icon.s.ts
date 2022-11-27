import { css } from "@emotion/css"
import { cached } from "reactronic"
import { Styling } from "./Styling"

export interface IconStyling {
  main: string
}

export class DefaultIconStyling extends Styling implements IconStyling {
  @cached get main(): string { return css`
    min-width: 1.25em;
    min-height: auto;
    text-align: center;
  `}
}
