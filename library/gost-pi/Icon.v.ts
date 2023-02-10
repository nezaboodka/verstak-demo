import { Ribbon, BlockBody } from "verstak"
import { $theme } from "./Theme"

export function Icon(name: string, body?: BlockBody<HTMLElement, void, void>) {
  return (
    Ribbon(body, {
      reaction: true,
      render(b) {
        const s = $theme.value.icon
        b.style(name)
        b.style(s.main)
      },
    })
  )
}
