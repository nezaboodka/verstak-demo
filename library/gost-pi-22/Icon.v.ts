import { Block, BlockBody, vmt } from "verstak"
import { useStyles } from "./Styles"

export const Icon = (name: string, body?: BlockBody<HTMLElement, void, void>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      const s = useStyles()
      b.style(name)
      b.style(s.iconStyle)
    },
  }})
)
