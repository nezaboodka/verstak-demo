import { Block, BlockBody, asComponent } from "verstak"

export function Icon(className: string, name?: string, body?: BlockBody<HTMLElement, void, void>) {
  return (
    Block(name ?? "", asComponent(body, {
      render(e, b) {
        e.className = className
        b.widthMin = "auto"
        b.heightMin = "auto"
      },
    }))
  )
}
