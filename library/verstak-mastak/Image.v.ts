import { Section, BlockBuilder, Mode } from "verstak"
import { observableModel } from "common/Utils"

export interface ImageModel {
  source?: string
}

export function Image(builder?: BlockBuilder<HTMLElement, ImageModel>) {
  return (
    Section<ImageModel>(builder, {
      mode: Mode.PinpointRefresh,
      initialize(b) {
        b.model ??= observableModel({ source: undefined })
      },
      render(b) {
        const m = b.model
        b.native.style.backgroundImage = `url(${m.source})`
        b.native.style.backgroundSize = "contain"
        b.native.style.backgroundRepeat = "no-repeat"
      },
    })
  )
}
