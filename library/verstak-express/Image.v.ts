import { Section, RxNodeDecl, Mode, El } from "verstak"
import { observableModel } from "common/Utils.js"

export interface ImageModel {
  source?: string
}

export function Image(decl?: RxNodeDecl<El<HTMLElement, ImageModel>>) {
  return (
    Section<ImageModel>(decl, {
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
