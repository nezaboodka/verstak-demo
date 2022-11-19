import { Block, BlockBody, vmt } from "verstak"

export interface OverlayModel {
  visible: boolean
}

export const Overlay = (body?: BlockBody<HTMLElement, OverlayModel>) => (
  Block<OverlayModel>({ autonomous: true, ...vmt(body), base: {
    key: Overlay.name,
    initialize(b) {
      const e = b.native
      b.overlay = true
      e.style.outlineOffset = "-0.5px"
      e.style.backgroundColor = "white"
    },
    render(b) {
      const e = b.native
      if (b.model.visible)
        e.style.display = "none"
      else
        e.style.display = ""
    }},
  })
)
