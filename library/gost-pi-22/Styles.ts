import { cached, ObservableObject, Transaction } from "reactronic"
import { tryUseContext } from "verstak"
import { css } from "@emotion/css"

export interface Styles {
  readonly buttonStyle: string
  readonly buttonIconStyle: string
  readonly buttonLabelStyle: string
  readonly fieldStyle: string
  readonly fieldIconStyle: string
  readonly fieldInputStyle: string
  readonly fieldPopupStyle: string
  readonly iconStyle: string
  readonly toggleStyle: string
  readonly toggleIconStyle: string
  readonly toggleLabelStyle: string
}

export function useStyles(): Styles {
  return tryUseContext(GostStyles) ?? PredefinedGhostStyles
}

export class GostStyles extends ObservableObject implements Styles {
  fillColor = "white"
  borderRadius = "0.35rem"
  outlineWidth = "1px"
  outlineColor = "rgba(127, 127, 127, 0.5)"
  outlinePadding = "0.25em"
  shadow = "0.05rem 0.05rem 0.15rem 0 rgba(127, 127, 127, 0.5)"

  @cached get buttonStyle(): string { return css`
    cursor: pointer;
    border-radius: ${this.borderRadius};
    outline: ${this.outlineWidth} solid ${this.outlineColor};
    outline-offset: -${this.outlineWidth};
  `}

  @cached get buttonIconStyle(): string { return css`
    min-width: 1.25em;
    & > :first-child { margin-right: ${this.outlinePadding}; }
    & > :last-child { margin-left: ${this.outlinePadding}; }
  `}

  @cached get buttonLabelStyle(): string { return css`
  `}

  @cached get fieldStyle(): string { return css`
    border-radius: ${this.borderRadius};
    outline: ${this.outlineWidth} solid ${this.outlineColor};
    outline-offset: -${this.outlineWidth};
  `}

  @cached get fieldIconStyle(): string { return css`
    margin-left: ${this.outlinePadding};
    color: ${this.outlineColor};
  `}

  @cached get fieldInputStyle(): string { return css`
    padding: ${this.outlinePadding};
  `}

  @cached get fieldPopupStyle(): string { return css`
    border-radius: ${this.borderRadius};
    outline: ${this.outlineWidth} solid ${this.outlineColor};
    outline-offset: -${this.outlineWidth};
    padding: ${this.outlinePadding};
    background-color: ${this.fillColor};
    margin-top: -${this.outlineWidth};
    margin-bottom: -${this.outlineWidth};
    box-shadow: ${this.shadow};
  `}

  @cached get iconStyle(): string { return css`
    min-width: 1.25em;
  `}

  @cached get toggleStyle(): string { return css`
  `}

  @cached get toggleIconStyle(): string { return css`
  `}

  @cached get toggleLabelStyle(): string { return css`
  `}
}

const PredefinedGhostStyles = Transaction.run(null, () => new GostStyles())
