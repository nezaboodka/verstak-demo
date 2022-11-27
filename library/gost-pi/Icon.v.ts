import { Block, BlockBody, vmt } from "verstak"
import { ActualTheme } from "./Theme"

export const Icon = (name: string, body?: BlockBody<HTMLElement, void, void>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      const s = ActualTheme.instance.icon
      b.style(name)
      b.style(s.main)
    },
  }})
)
