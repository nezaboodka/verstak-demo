import { Block, BlockArgs, Render, Plain } from "verstak"

export function WorkArea(name: string,
  args?: BlockArgs<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  return (
    Block(name, { ...args, wrapper: render, render(e, b) {
      Plain("Hello")
    }})
  )
}
