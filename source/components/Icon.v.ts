import { Block, BlockArgs, asComponent } from "verstak"

export function Icon(className: string, name?: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name ?? "", asComponent(args, {
      render(e, b) {
        e.className = className
        b.widthMin = "auto"
        b.heightMin = "auto"
      },
    }))
  )
}
