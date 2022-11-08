import { $bounds, Block, BlockOptions, br, $ } from "verstak"
import * as z from "theme/Common.css"

export function Panel(name: string, content: string, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    Block(name, { as: [z.Content], ...options }, (e, b) => {

      br()
      $(name)

      br()
      $bounds({ heightGrow: 1 })
      $(e => {
        e.innerText = content
        e.style.margin = "0.25em"
      }, [z.Content])
    })
  )
}
