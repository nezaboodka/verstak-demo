import { Mode, RxNodeDecl } from "reactronic"
import { Section, Align, rowBreak, El, OnClick } from "verstak"
import { observableModel } from "verstak-express"

// export type Concrete<T> = { [P in keyof T]-?: T[P] }
// export type ResolvedOptions<T, U extends keyof T | "" = ""> = Readonly<Concrete<Omit<T, U>> & Pick<T, Exclude<U, "">>>

export type RangePx = { min: number, max: number }

export type PaneModel = {
  isExpanded?: boolean,

  header?: RxNodeDecl<El<HTMLElement>>,
  headerSizePx?: RangePx,

  body?: RxNodeDecl<El<HTMLElement>>,
  bodySizePx?: RangePx,
}

const defaultHeaderSizePx = Object.freeze({ min: 24, max: 24 })
const defaultBodySizePx = Object.freeze({ min: 24, max: Number.POSITIVE_INFINITY })

export function Pane(declaration?: RxNodeDecl<El<HTMLElement, PaneModel>>) {
  return (
    Section(declaration, {
      mode: Mode.independentUpdate,
      onCreate: el => {
        el.alignment = Align.stretchXY
        el.model ??= observableModel<PaneModel>({
          isExpanded: true,
        })
      },
      onChange: p => {
        const m = p.model
        const header = m.header
        const headerSize = m.headerSizePx ?? (header ? defaultHeaderSizePx : { min: 0, max: 0 })
        const bodySize = m.bodySizePx ?? defaultBodySizePx
        p.height = m.isExpanded
          ? { min: `${headerSize.min + bodySize.min}px` }
          : { min: `${headerSize.min}px`, max: `${headerSize.max}px` }

        if (header) {
          Section(header, {
            key: "header",
            mode: Mode.independentUpdate,
            triggers: { headerSize },
            onCreate: el => {
              el.native.className = "header"
              el.alignment = Align.top + Align.stretchX
            },
            onChange: el => {
              el.height = { min: `${headerSize.min}px`, max: `${headerSize.max}px` }
              OnClick(el.native, () => m.isExpanded = !m.isExpanded)
            },
          })
        }

        if (m.isExpanded) {
          rowBreak()
          Section(m.body, {
            key: "body",
            mode: Mode.independentUpdate,
            triggers: { headerSize, bodySize },
            onCreate: el => {
              el.alignment = Align.stretchXY
              el.style.overflow = "scroll"
            },
            onChange: el => {
              const sizePx = p.partitionSizeInSplitViewPx - headerSize.min
              el.height = { min: `${sizePx}px`, max: `${sizePx}px` }
            },
          })
        }
      },
    })
  )
}

// function resolveOptions(options?: PaneModel): ResolvedOptions<PaneModel> {
//   return ({
//     headerSize: options?.headerSize ?? "24px",
//   })
// }
