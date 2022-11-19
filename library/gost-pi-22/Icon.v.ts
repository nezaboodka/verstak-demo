import { Block, BlockBody, vmt } from "verstak"

export const Icon = (className: string, body?: BlockBody<HTMLElement, void, void>) => (
  Block({ autonomous: true, ...vmt(body), base: {
    render(b) {
      b.minWidth = "auto"
      b.minHeight = "auto"
      b.native.className = className
    },
  }})
)
