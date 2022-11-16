import { asBaseFor, Block, BlockBody, PlainText } from "verstak"
import { css } from "@emotion/css"

export function Label(text: string, body?: BlockBody<HTMLElement>) {
  return (
    Block(asBaseFor(body, { key: Label.name,
      render(b) {
        b.native.className = LabelStyle
        PlainText(text, {
          initialize(b) {
            b.contentWrapping = false
          },
        })
      }
    }))
  )
}

const LabelStyle = css`
  padding-left: 0.5em;
`
