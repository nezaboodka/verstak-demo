import { RxNodeDecl, Mode } from "reactronic"
import { Section, El } from "verstak"
import { observableModel } from "./common/Utils.js"

export type ImageModel = {
  source?: string
}

export function Image(declaration?: RxNodeDecl<El<HTMLElement, ImageModel>>) {
  return (
    Section<ImageModel>(declaration, {
      mode: Mode.independentUpdate,
      activation(b) {
        b.model ??= observableModel({ source: undefined })
      },
      content(b) {
        const m = b.model
        b.native.style.backgroundImage = `url(${m.source})`
        b.native.style.backgroundSize = "contain"
        b.native.style.backgroundRepeat = "no-repeat"
      },
    })
  )
}
