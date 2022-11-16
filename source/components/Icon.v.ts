import { Block, BlockVmt, asComponent } from "verstak"

export function Icon(className: string, name?: string, vmt?: BlockVmt<HTMLElement, void, void>) {
  return (
    Block(name ?? "", asComponent(vmt, {
      render(e, b) {
        e.className = className
        b.widthMin = "auto"
        b.heightMin = "auto"
      },
    }))
  )
}
