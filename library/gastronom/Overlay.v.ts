import { Block, BlockBody, vmt } from "verstak"

export interface OverlayModel {
  visible: boolean
}

export const Overlay = (body?: BlockBody<HTMLElement, OverlayModel>) => (
  Block<OverlayModel>({ autonomous: true, ...vmt(body), base: {
    key: Overlay.name,
    initialize(b) {
      b.overlayVisible = true
    },
    render(b) {
      b.native.style.display = b.model.visible ? "" : "none"
    }},
  })
)
