import { Mode, ObservableObject, ReactiveNode, ReactiveNodeDecl, raw, unobs } from "reactronic"
import { Panel, Horizontal, Vertical, rowBreak, El, OnClick, SyntheticElement } from "verstak"

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

export function Pane(declaration: ReactiveNodeDecl<El<HTMLElement, PaneModel>>, bodyDeclaration: ReactiveNodeDecl<El<HTMLElement, PaneModel>>, headerDeclaration?: ReactiveNodeDecl<El<HTMLElement, PaneModel>>) {
  return (
    Panel<PaneModel>(ReactiveNode.withBasis({
      mode: Mode.autonomous,
      preparation: (el, base) => {
        const m = el.model = new PaneModel(el)
        base()
        el.horizontally = Horizontal.stretch
        el.vertically = Vertical.stretch
        m.setInitialSizes(el.height.min, el.height.max)
      },
      script: (p, base) => {
        base()
        const m = p.model
        unobs(() => m.setInitialSizes(p.height.min, p.height.max))
        let header: ReactiveNode<El<HTMLElement>> | undefined = undefined
        if (headerDeclaration) {
          header = Panel(ReactiveNode.withBasis({
            key: "header",
            mode: Mode.autonomous,
            preparation: (el, base) => {
              el.model = m
              base()
              el.native.className = "header"
              el.horizontally = Horizontal.stretch
              el.vertically = Vertical.top
            },
            script: (el, base) => {
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
          }, headerDeclaration))
          rowBreak()
        }
        Panel(ReactiveNode.withBasis({
          key: "body",
          mode: Mode.autonomous,
          triggers: { header },
          preparation: (el, base) => {
            el.model = m
            base()
            el.native.className = "body"
            el.style.overflow = "scroll"
            el.horizontally = Horizontal.stretch
            el.vertically = Vertical.stretch
          },
          script: (el, base) => {
            base()
            const headerSizePx = header?.element.native.clientHeight ?? 0
            const minPx = Math.max(0, p.heightPx.minPx - headerSizePx)
            const maxPx = p.partitionSizeInSplitViewPx - headerSizePx
            el.height = { min: `${minPx}px`, max: `${maxPx}px` }
          }
        }, bodyDeclaration))
        SyntheticElement({
          mode: Mode.autonomous,
          triggers: { header, stamp: p.node.stamp },
          script: () => {
            const headerSizePx = header?.element.native.clientHeight ?? 0
            p.height = m.isExpanded
              ? { min: m.initialMinSize, max: m.initialMaxSize, preferred: `${m.sizePx}px` }
              : { min: `${headerSizePx}px`, max: `${headerSizePx}px`, preferred: `${headerSizePx}px` }
          },
        })
      },
    }, declaration))
  )
}
