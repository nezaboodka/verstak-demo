import { Block, BlockArgs, asComponent } from "verstak"

export function Icon(className: string, name?: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name ?? "", asComponent(args, {
      widthMin: "auto",
      heightMin: "auto",
      render(e, b) {
        e.className = className
      },
    }))
  )
}
