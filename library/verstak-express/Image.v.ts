import { Section, ElBuilder, Mode } from "verstak"
import { observableModel } from "common/Utils.js"

export interface ImageModel {
  source?: string
}

export function Image(builder?: ElBuilder<HTMLElement, ImageModel>) {
  return (
    Section<ImageModel>(builder, {
      mode: Mode.PinpointUpdate,
      initialize(b) {
        b.model ??= observableModel({ source: undefined })
      },
      update(b) {
        const m = b.model
        b.native.style.backgroundImage = `url(${m.source})`
        b.native.style.backgroundSize = "contain"
        b.native.style.backgroundRepeat = "no-repeat"
      },
    })
  )
}
