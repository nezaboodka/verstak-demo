import { Block } from "verstak"

export function Icon(className: string, name?: string) {
  return (
    Block(name ?? "", {
      widthMin: "auto",
      heightMin: "auto",
      render(e, b) {
        e.className = className
      }
    })
  )
}
