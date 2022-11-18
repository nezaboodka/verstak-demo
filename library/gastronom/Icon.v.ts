import { Block, BlockBody, asBaseFor } from "verstak"

export function Icon(className: string, body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(asBaseFor(body, {
      autonomous: true,
      render(b) {
        b.minWidth = "auto"
        b.minHeight = "auto"
        b.native.className = className
      },
    }))
  )
}
