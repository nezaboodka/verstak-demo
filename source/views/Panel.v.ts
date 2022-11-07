import { block, BlockOptions, begin, text } from "verstak"

export function Panel(name: string, content: string, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, options, (e, b) => {
      e.style.border = "1px solid red"
      e.style.margin = "1em"

      begin({ box: { hGrow: 1 } })
      text(name)

      begin({ box: { hGrow: 1 } })
      text(content)
    })
  )
}
