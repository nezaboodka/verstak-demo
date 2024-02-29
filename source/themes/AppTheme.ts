import { cached } from "reactronic"
import { css } from "@emotion/css"
import { Theme } from "verstak-express"

export class AppTheme extends Theme {
  accentColor: string = ""
  spaceFillColor: string = ""
  markdown: string = ""

  @cached
  get page(): string { return css`
    .splitter {
      :hover {
        background-color: rgba(27, 127, 227, 1);
        transition: background-color ease .2s .7s;
      }
      &[rx-dragging=true] { transition: none !important; }
    }

    .splitter-1 {
      :hover { background-color: red; }
    }
  `}

  @cached
  get panel(): string { return css`
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
