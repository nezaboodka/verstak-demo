import { Block, PlainText } from "verstak"
import { css } from "@emotion/css"

export function Label(text: string, name?: string) {
  return (
    Block(name ?? "", {
      render(b) {
        b.native.className = LabelStyle
        PlainText(text, undefined, {
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
