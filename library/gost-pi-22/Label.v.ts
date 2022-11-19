import { Block, BlockBody, PlainText, vmt } from "verstak"
import { css } from "@emotion/css"

export const Label = (text: string, body?: BlockBody<HTMLElement>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      PlainText(text, {
        initialize(b) {
          b.contentWrapping = false
        },
      })
    }
  }})
)
