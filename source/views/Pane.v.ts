import { Delegate, Mode, ObservableObject, RxNode, RxNodeDecl, Transaction, raw } from "reactronic"
import { Section, Alignment, VerticalAlignment, rowBreak, El, OnClick, Handling } from "verstak"
import { observableModel } from "verstak-express"

// export type Concrete<T> = { [P in keyof T]-?: T[P] }
// export type ResolvedOptions<T, U extends keyof T | "" = ""> = Readonly<Concrete<Omit<T, U>> & Pick<T, Exclude<U, "">>>

export class PaneModel extends ObservableObject {
  @raw private readonly _el: El<HTMLElement, PaneModel>
  @raw readonly initialMinSize: string | undefined
  @raw readonly initialMaxSize: string | undefined

  isExpanded: boolean
  sizePx: number
  cachedSizePx: number

  get heightPx(): { minPx: number, maxPx: number } {
    return this._el.heightPx
  }

  get partitionSizeInSplitViewPx(): number {
    return this._el.partitionSizeInSplitViewPx
  }

  constructor(el: El<HTMLElement, PaneModel>) {
    super()
    this._el = el
    this.isExpanded = true
    this.sizePx = 0
    this.cachedSizePx = 0
  }

  setInitialSizes(min?: string, max?: string): void {
    (this.initialMinSize as any) = min;
    (this.initialMaxSize as any) = max
  }
}

export function Pane(onCreate: Delegate<El<HTMLElement, PaneModel>>, bodyDeclaration: RxNodeDecl<El<HTMLElement, PaneModel>>, headerDeclaration?: RxNodeDecl<El<HTMLElement, PaneModel>>) {
  return (
    Section<PaneModel>({
      mode: Mode.independentUpdate,
      onCreate: (el, base) => {
        const m = el.model = Transaction.separate(() => new PaneModel(el))
        el.alignment = Alignment.stretch
        el.verticalAlignment = VerticalAlignment.stretch
        onCreate(el, base)
        m.setInitialSizes(el.height.min, el.height.max)
      },
      onChange: p => {
        const m = p.model
        let header: RxNode<El<HTMLElement>> | undefined = undefined
        if (headerDeclaration) {
          header = Section({
            key: "header",
            mode: Mode.independentUpdate,
            onCreate: (el, base) => {
              el.model = m
              base()
              el.native.className = "header"
              el.alignment = Alignment.stretch
              el.verticalAlignment = VerticalAlignment.top
            },
            onChange: (el, base) => {
              base()
              OnClick(el.native, () => {
                m.isExpanded = !m.isExpanded
                if (m.isExpanded) {
                  m.sizePx = m.cachedSizePx
                  m.cachedSizePx = 0
                }
                else {
                  m.cachedSizePx = p.partitionSizeInSplitViewPx
                }
              })
            },
          }, headerDeclaration)
          rowBreak()
        }
        Section({
          key: "body",
          mode: Mode.independentUpdate,
          triggers: { header },
          onCreate: (el, base) => {
            el.model = m
            base()
            el.native.className = "body"
            el.style.overflow = "scroll"
            el.alignment = Alignment.stretch
            el.verticalAlignment = VerticalAlignment.stretch
          },
          onChange: (el, base) => {
            base()
            const headerSizePx = header?.element.native.clientHeight ?? 0
            const minPx = Math.max(0, p.heightPx.minPx - headerSizePx)
            const maxPx = p.partitionSizeInSplitViewPx - headerSizePx
            el.height = { min: `${minPx}px`, max: `${maxPx}px` }
          }
        }, bodyDeclaration)
        Handling(() => {
          const headerSizePx = header?.element.native.clientHeight ?? 0
          p.height = m.isExpanded
            ? { min: m.initialMinSize, max: m.initialMaxSize, preferred: `${m.sizePx}px` }
            : { min: `${headerSizePx}px`, max: `${headerSizePx}px` }
        })
      },
    })
  )
}

// function resolveOptions(options?: PaneModel): ResolvedOptions<PaneModel> {
//   return ({
//     headerSize: options?.headerSize ?? "24px",
//   })
// }
