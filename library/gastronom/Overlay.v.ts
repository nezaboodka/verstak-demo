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
      const parent = b.host.native
      if (parent instanceof HTMLElement) {
        const bounds = parent.getBoundingClientRect()
        const x = document.body.offsetWidth - bounds.left
        if (x < document.body.offsetWidth / 2)
          e.style.right = `${document.body.offsetWidth - bounds.right}px`
        else
          e.style.left = `${bounds.left}px`
        if (bounds.top > document.body.clientHeight / 2)
          e.style.bottom = `${document.body.offsetHeight - bounds.top + 1}px`
        else
          e.style.top = `${bounds.bottom + 1}px`
      }
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
