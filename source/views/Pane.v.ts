import { Mode, ObservableObject, ReactiveTreeNode, ReactiveTreeNodeDecl, observable, runNonReactively, derivative } from "reactronic"
import { Division, Horizontal, Vertical, rowBreak, El, OnClick, PseudoElement } from "verstak"

export class PaneModel extends ObservableObject {
  @observable(false) private readonly _el: El<HTMLElement, PaneModel>
  @observable(false) readonly initialMinSize: string | undefined
  @observable(false) readonly initialMaxSize: string | undefined

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

export function Pane(declaration: ReactiveTreeNodeDecl<El<HTMLElement, PaneModel>>, bodyDeclaration: ReactiveTreeNodeDecl<El<HTMLElement, PaneModel>>, headerDeclaration?: ReactiveTreeNodeDecl<El<HTMLElement, PaneModel>>) {
  return (
    Division<PaneModel>(derivative({
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
        runNonReactively(() => m.setInitialSizes(p.height.min, p.height.max))
        let header: ReactiveTreeNode<El<HTMLElement>> | undefined = undefined
        if (headerDeclaration) {
          header = Division(derivative({
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
        Division(derivative({
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
        PseudoElement({
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
