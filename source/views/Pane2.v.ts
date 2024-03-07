import { Mode, ObservableObject, RxNodeDecl, Transaction } from "reactronic"
import { Section, Align, rowBreak, El, OnClick } from "verstak"
import { observableModel } from "verstak-express"

// export type Concrete<T> = { [P in keyof T]-?: T[P] }
// export type ResolvedOptions<T, U extends keyof T | "" = ""> = Readonly<Concrete<Omit<T, U>> & Pick<T, Exclude<U, "">>>

export type RangePx = { min: number, max: number }

// export type PaneModel = {
//   isExpanded?: boolean,

//   header?: RxNodeDecl<El<HTMLElement, PaneModel>>,
//   headerSizePx?: RangePx,

//   body?: RxNodeDecl<El<HTMLElement, PaneModel>>,
//   bodySizePx?: RangePx,
// }

class PaneModel extends ObservableObject {
  isExpanded: boolean

  isHeaderVisible: boolean
  header: RxNodeDecl<El<HTMLElement, PaneModel>> | undefined

  constructor() {
    super()
    this.isExpanded = true
    this.isHeaderVisible = false
    this.header = undefined
  }
}

const defaultHeaderSizePx = Object.freeze({ min: 24, max: 24 })
const defaultBodySizePx = Object.freeze({ min: 24, max: Number.POSITIVE_INFINITY })

let sizePx = 0
let cachedSizePx = 0

export function Pane2(declaration?: RxNodeDecl<El<HTMLElement, PaneModel>>) {
  return (
    Section({
      mode: Mode.independentUpdate,
      onCreate: (el, base) => {
        el.model = Transaction.separate(() => new PaneModel())
        el.alignmentInside = Align.stretchX
        // el.style.overflow = "scroll"
        base()
      },
      onChange: (p, base) => {
        const m = p.model
        if (m.isHeaderVisible) {
          if (m.header) {
            Section({
              key: "header",
              mode: Mode.independentUpdate,
              onCreate: (el, base) => {
                el.model = m
                el.native.className = "header"
                el.alignment = Align.top + Align.stretchX
                el.style.backgroundColor = "red"
                base()
              },
              onChange: (el, base) => {
                base()
                OnClick(el.native, () => {
                  m.isExpanded = !m.isExpanded
                  if (m.isExpanded) {
                    sizePx = cachedSizePx
                    cachedSizePx = 0
                  }
                  else {
                    cachedSizePx = p.partitionSizeInSplitViewPx
                  }
                })
              },
            }, m.header)
            rowBreak()
          }
          Section({
            onChange: el => {
              base()
            }
          })
        }
        else {
          base()
        }
        // const headerSize = m.headerSizePx ?? (header ? defaultHeaderSizePx : { min: 0, max: 0 })
        // const bodySize = m.bodySizePx ?? defaultBodySizePx

        // p.height = m.isExpanded
        //   ? { min: `${headerSize.min + bodySize.min}px`, max: `${headerSize.max + bodySize.max}px`, preferred: `${sizePx}px` }
        //   : { min: `${headerSize.min}px`, max: `${headerSize.max}px` }
      },
    }, declaration)
  )
}

// function resolveOptions(options?: PaneModel): ResolvedOptions<PaneModel> {
//   return ({
//     headerSize: options?.headerSize ?? "24px",
//   })
// }
