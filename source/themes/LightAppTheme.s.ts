import { css } from "@emotion/css"
import { AppTheme } from "./AppTheme.js"

export class LightAppTheme extends AppTheme {
  override name = "Light Theme"
  override fillColor = "white"
  override textColor = "black"
  override spaceFillColor = "#F0F0F0"
  override accentColor = "crimson"

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
      color: #202020;
    }
    .token.comment {
      color: #A0A0A0;
      font-style: italic;
    }
    .token.number,
    .token.string,
    .token.string-line {
      color: #027111;
    }
    .token.string .token.substitution > .token.brace-curly {
      color: #2222CC;
    }
    .token.type {
      color: #469FA9;
    }
    .token.operation,
    .token.function {
      color: #930505;
    }
    .token.keyword,
    .token.operator,
    .token.boolean,
    .token.symbol,
    .token.brace-curly,
    .token.brace-square {
      color: #2222CC;
    }
    .token.kw {
      color: #2222CC;
    }
    .token.tag {
      /* color: #027111; */
      /* font-size: 80%; */
      color: #2222CC;
      font-style: italic;
    }
    .token.punctuation {
      color: #B0B0B0;
      /* color: #abade9; */
    }
  `
}
