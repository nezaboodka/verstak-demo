import { Block, PlainText } from "verstak"
import { css } from "@emotion/css"

export function Label(text: string, name?: string) {
  return (
    Block(name ?? "", {
      render(e, b) {
        e.className = LabelStyle
        PlainText(text, undefined, {
          initialize(e, b) {
            b.wrapContent = false
          },
        })
      }
    })
  )
}

const LabelStyle = css`
  padding-left: 0.5em;
`
