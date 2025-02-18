import { css } from "@emotion/css"
import { AppTheme } from "./AppTheme.js"

export class DarkAppTheme extends AppTheme {
  override name = "Dark Theme"
  override fillColor = "#14344F"
  override textColor = "white"
  override positiveColor = "rgb(160, 237, 49)"
  override negativeColor = "orangered"
  override shadow = "0.1rem 0.1rem 0.5rem 0 black"
  override spaceFillColor = "#15293e"
  override accentColor = "#FFFFA0"

  override markdown = css`
    .toc-inner {
      background-color: rgba(0, 0, 0, 0.2);
      border: ${this.outlineWidth} solid rgba(0, 0, 0, 0.15);
    }

    pre {
      color: #f0f0f0;
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 0 ${this.outlineWidth} rgba(0, 0, 0, 0.15) inset;
    }

    /* .token {
      color: #D7D7D7;
    } */

    .substitution {
      color: #D7D7D7;
    }

    .token.keyword,
    .token.operator,
    .token.boolean,
    .token.symbol,
    .token.brace-curly,
    .token.brace-square {
      color: #86CCF6;
    }

    .token.kw {
      color: #86CCF6;
    }

    .token.tag {
      /* color: #FFD0D0; */
      /* font-size: 80%; */
      color: #86CCF6;
      font-style: italic;
    }

    .token.punctuation {
      /* color: #9090A0; */
      color: #547289;
    }

    .token.number,
    .token.string,
    .token.string-line {
      color: #FFD0D0;
    }

    .token.string .token.substitution > .token.brace-curly {
      color: #86CCF6;
    }

    .token.comment {
      color: #808090;
      font-style: italic;
    }

    .token.type {
      color: #5EF9C0;
    }

    .token.operation,
    .token.function {
      color: #FFFFA0;
    }
  `
}
