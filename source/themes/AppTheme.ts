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

  @cached
  get group(): string { return css`
    .header {
      white-space: nowrap;

      .size-tag {
        line-height: 14px;
        font-size: 70%;
        padding: 0 2px;
        border-radius: 0.3em;
        margin-right: 0.5em;
        color: white;
      }

      .effective-size {
        float: right;
      }

      i {
        font-size: 80%;
        margin-right: 0.5em;
      }
    }

    &[rx-max=true] { .size-tag { background-color: orangered; border: 1px solid #be1a1a; } }
    &[rx-min=true] { .size-tag { background-color: #00BB00; border: 1px solid green; } }
    &[rx-min=true][rx-max=true] { .size-tag { background-color: #004eff; border: 1px solid #00309d; } }
  `}
}
