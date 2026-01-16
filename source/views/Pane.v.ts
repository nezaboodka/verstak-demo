import { Mode, RxObject, ReactiveTreeNode, ReactiveTreeNodeDecl, signal, runNonReactive, derivative } from "reactronic"
import { Block, Horizontal, Vertical, rowBreak, El, OnClick, PseudoElement } from "verstak"

export class PaneModel extends RxObject {
  @signal(false) private readonly _el: El<HTMLElement, PaneModel>
  @signal(false) readonly initialMinSize: string | undefined
  @signal(false) readonly initialMaxSize: string | undefined

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
    Block<PaneModel>(derivative({
      mode: Mode.autonomous,
      preparation(el, base) {
        const m = this.model = new PaneModel(this)
        base()
        this.horizontally = Horizontal.stretch
        this.vertically = Vertical.stretch
        m.setInitialSizes(this.height.min, this.height.max)
      },
      script(el, base) {
        const p = this
        base()
        const m = this.model
        runNonReactive(() => m.setInitialSizes(this.height.min, this.height.max))
        let header: ReactiveTreeNode<El<HTMLElement>> | undefined = undefined
        if (headerDeclaration) {
          header = Block(derivative({
            key: "header",
            mode: Mode.autonomous,
            preparation(el, base) {
              this.model = m
              base()
              this.native.className = "header"
              this.horizontally = Horizontal.stretch
              this.vertically = Vertical.top
            },
            script(el, base) {
              base()

              OnClick(this.native, () => {
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
        Block(derivative({
          key: "body",
          mode: Mode.autonomous,
          signalArgs: { header },
          preparation(el, base) {
            this.model = m
            base()
            this.native.className = "body"
            this.style.overflow = "scroll"
            this.horizontally = Horizontal.stretch
            this.vertically = Vertical.stretch
          },
          script(el, base) {
            base()
            const headerSizePx = header?.element.native.clientHeight ?? 0
            const minPx = Math.max(0, p.heightPx.minPx - headerSizePx)
            const maxPx = p.partitionSizeInSplitViewPx - headerSizePx
            this.height = { min: `${minPx}px`, max: `${maxPx}px` }
          }
        }, bodyDeclaration))
        PseudoElement({
          mode: Mode.autonomous,
          signalArgs: { header, stamp: p.node.stamp },
          script() {
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
