import { Block, BlockBody, baseFor } from "verstak"

export function Icon(className: string, name?: string, body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(name ?? "",
      baseFor(body, {
        render(b) {
          b.widthMin = "auto"
          b.heightMin = "auto"
          b.native.className = className
        },
      })
    )
  )
}
