import { Block, BlockBody, PlainText, vmt } from "verstak"
import { css } from "@emotion/css"

export const Label = (text: string, body?: BlockBody<HTMLElement>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      b.native.className = LabelStyle
      PlainText(text, {
        initialize(b) {
          b.contentWrapping = false
        },
      })
    }
  }})
)

const LabelStyle = css`
  padding-left: 0.5em;
`
