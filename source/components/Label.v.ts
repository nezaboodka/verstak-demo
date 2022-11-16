import { Block, PlainText } from "verstak"
import { css } from "@emotion/css"

export function Label(text: string) {
  return (
    Block({
      render(b) {
        b.native.className = LabelStyle
        PlainText(text, {
          initialize(b) {
            b.contentWrapping = false
          },
        })
      }
    })
  )
}

const LabelStyle = css`
  padding-left: 0.5em;
`
