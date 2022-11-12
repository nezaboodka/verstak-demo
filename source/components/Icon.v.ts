import { Block, BlockArgs } from "verstak"

export function Icon(className: string, name?: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name ?? "", { ...args,
      widthMin: "auto",
      heightMin: "auto",
      render(e, b) {
        e.className = className
      }
    })
  )
}
