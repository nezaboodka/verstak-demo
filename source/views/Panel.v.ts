import { $bounds, block, BlockOptions, br, text } from "verstak"
import * as z from "theme/Common.css"

export function Panel(name: string, content: string, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, { as: [z.Content], ...options }, (e, b) => {

      br()
      text(name)

      br()
      $bounds({ heightGrow: 1 })
      text(e => {
        e.innerText = content
        e.style.margin = "0.25em"
      }, [z.Content])
    })
  )
}
