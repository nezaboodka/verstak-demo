import { Block, BlockBody, vmt } from "verstak"
import { $Theme } from "./Theme"

export const Icon = (name: string, body?: BlockBody<HTMLElement, void, void>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      const s = $Theme.current.icon
      b.style(name)
      b.style(s.main)
    },
  }})
)
