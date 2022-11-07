import { block, BlockOptions, br, text } from "verstak"

export function Panel(name: string, content: string, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, options, (e, b) => {
      e.style.border = "1px solid red"
      e.style.margin = "1em"

      br()
      text(name)

      br()
      text(content, { box: { hGrow: 1 } })
    })
  )
}
