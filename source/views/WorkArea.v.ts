import { Block, BlockPreset, text, $} from "verstak"

export function WorkArea(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      $`Hello`
    })
  )
}
