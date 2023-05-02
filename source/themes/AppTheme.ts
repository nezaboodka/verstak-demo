import { cached } from "reactronic"
import { css } from "@emotion/css"
import { Theme } from "verstak-mastak"

export class AppTheme extends Theme {
  accentColor: string = ""
  spaceFillColor: string = ""
  markdown: string = ""

  @cached
  get panel(): string { return css`
    margin: 0.5rem;
    padding: 0.75rem;
    box-shadow: ${this.shadow};
    border-radius: ${this.borderRadius};
    background-color: ${this.fillColor};
  `}

  @cached
  get accent(): string { return css`
    border: ${this.outlineWidth} solid ${this.accentColor};
  `}
}
