import { css } from "@emotion/css"
import { AppTheme } from "./AppTheme.js"

export class PrintAppTheme extends AppTheme {
  override name = "Print Theme"
  override fillColor = "white"
  override textColor = "black"
  override positiveColor = "black"
  override negativeColor = "black"
  override spaceFillColor = "white"
  override accentColor = "black"

  override markdown = css`
    .toc-inner {
      background-color: unset;
      border: ${this.outlineWidth} solid rgba(0, 0, 0, 0.25);
    }

    pre {
      color: #000000;
      background-color: inherit;
      box-shadow: 0 0 0 ${this.outlineWidth} rgba(0, 0, 0, 0.25) inset;
    }

    .substitution {
      color: #000000;
    }

    .token.comment {
      color: #808080;
      font-style: italic;
    }

    .token.number,
    .token.string,
    .token.string-line {
      color: #000000;
    }

    .token.string .token.substitution > .token.brace-curly {
      font-weight: bold;
    }

    .token.type {
      color: #5F5F5F;
    }

    .token.operation,
    .token.function {
      color: #000000;
      text-decoration: underline;
      text-decoration-thickness: from-font;
      text-decoration-color: #707070;
    }

    .token.keyword,
    .token.operator,
    .token.boolean,
    .token.brace-curly,
    .token.brace-square {
      font-weight: bold;
    }

    .token.kw {
      font-weight: bold;
    }

    .token.tag {
      /* font-size: 80%; */
      font-weight: bold;
      font-style: italic;
    }

    .token.symbol {
      color: #000000;
    }

    .token.punctuation {
      color: #808080;
    }
  `
}
