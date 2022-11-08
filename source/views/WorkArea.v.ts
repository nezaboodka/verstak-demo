import { Block, BlockArgs, $} from "verstak"

export function WorkArea(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, args, (e, b) => {
      $`Hello`
    })
  )
}
