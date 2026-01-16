import { refs, Mode, ReactiveTreeNodeDecl } from "reactronic"
import { RealTimeClock, Block, Horizontal, Vertical, rowBreak, Dimension, El, Direction, equal, Markdown, Input, Theme, composeInputModel, Icon } from "verstak"
import { Span } from "verstak/html"
import { DemoApp } from "models/DemoApp.js"
import { toolBar } from "./ToolBar.v.js"
import { statusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"
import { Pane, PaneModel } from "./Pane.v.js"

export function MainWindow(clock: RealTimeClock) {
  return (
    Block({
      mode: Mode.autonomous,
      preparation() {
        this.native.sensors.focus // enable focus global manager
        this.horizontally = Horizontal.stretch
        this.vertically = Vertical.stretch
        this.style.padding = "1em"
        this.style.gap = "1em"
        this.style.overflow = "hidden"
      },
      script() {
        const app = DemoApp.current
        const theme = app.theme
        Theme.current = theme
        this.useStylingPreset(DemoApp.blinkingEffectMarker, app.isBlinkingEffectOn)

        toolBar()

        rowBreak()

        Block({
          preparation() {
            this.splitView = Direction.horizontal
            this.horizontally = Horizontal.stretch
            this.vertically = Vertical.stretch
            const hostEl = this.node.host.element as El
            hostEl.style.flexGrow = "1"
          },
          script() {
            // Dimension.gFontSizePx.value = 16
            Dimension.lineSizePx = 20
            Block({
              preparation() { this.splitView = Direction.vertical },
              script() {
                // Dimension.gFontSizePx.value = 26
                Dimension.lineSizePx = 40
                this.useStylingPreset(app.theme.panel)
                this.style.marginRight = "0.5em"
                this.width = { min: "19em" }
                this.stretchingStrengthHorizontally = 0
                this.horizontally = Horizontal.stretch
                this.vertically = Vertical.stretch
                this.contentHorizontally = Horizontal.stretch
                this.contentVertically = Vertical.top

                Block({
                  preparation() {
                    this.height = { min: "2em", max: "2em" }
                    this.vertically = Vertical.top /* + Align.centerX */
                    this.stretchingStrengthVertically = 0
                  },
                  script() {
                    this.style.display = "block"
                    this.text = "SIDE BAR"
                    // Dimension.gFontSizePx.value = app.activeThemeIndex > 0 ? 36 : 16
                  },
                })

                // rowBreak()
                Input({
                  preparation(el, base) {
                    const loader = app.loader
                    this.width = { min: "10em" }
                    this.height = { min: "2em", max: "4em" }
                    this.vertically = Vertical.center
                    this.stretchingStrengthVertically = 0
                    this.model = composeInputModel({
                      icon: "fa-solid fa-search",
                      text: refs(loader).filter,
                      options: refs(loader).loaded,
                      isHotText: true,
                      isMultiLineText: false,
                    })
                    base()
                    this.style.marginBottom = "0.5em"
                  },
                })

                // rowBreak()
                Pane({
                  preparation() {
                    this.useStylingPreset(app.theme.group)
                    this.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script() {
                    Markdown(EXAMPLE_CODE)
                  },
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation() {
                    this.useStylingPreset(app.theme.group)
                    this.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script() {
                    Markdown(EXAMPLE_CODE)
                  },
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation() {
                    this.useStylingPreset(app.theme.group)
                    this.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script() {
                    Markdown(EXAMPLE_CODE)
                  },
                }, GroupHeader("Group"))

                // rowBreak()
                Block({
                  script() {
                    this.vertically = Vertical.stretch
                    this.stretchingStrengthVertically = 2
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Input({
                  preparation(el, base) {
                    const loader = app.loader
                    this.width = { min: "10em" }
                    this.height = { min: "2ln" }
                    this.vertically = Vertical.top
                    this.stretchingStrengthVertically = 0
                    this.model = composeInputModel({
                      text: refs(loader).filter,
                      options: refs(loader).loaded,
                      isHotText: true,
                      isMultiLineText: false,
                    })
                    base()
                  },
                })
              }
            })
            WorkArea(clock, {
              script(el, base) {
                base()
                this.useStylingPreset(theme.panel)
                this.useStylingPreset(theme.accent)
                this.style.margin = "0 0.5em"
                this.width = { min: "330px" }
                this.horizontally = Horizontal.stretch
                this.vertically = Vertical.stretch
                this.stretchingStrengthHorizontally = 3
              }
            })
            Block({
              mode: Mode.autonomous,
              signalArgs: { theme },
              script() {
                this.useStylingPreset(theme.panel)
                this.useStylingPreset(theme.markdown)
                this.style.marginLeft = "0.5em"
                this.width = { min: "300px", max: "50%" }
                this.stretchingStrengthHorizontally = 3
                this.horizontally = Horizontal.stretch
                this.vertically = Vertical.stretch
                this.contentHorizontally = Horizontal.stretch
                this.contentVertically = Vertical.top
                this.splitView = Direction.vertical
                Pane({
                  preparation() {
                    this.useStylingPreset(app.theme.group)
                    this.height = { min: "300px", max: "450px" }
                    this.stretchingStrengthVertically = 1
                  },
                }, {
                  script() {
                    Markdown(EXAMPLE_CODE)
                  },
                }, GroupHeader("Group"))
                Input({
                  preparation(el, base) {
                    const loader = app.loader
                    this.width = { min: "10em" }
                    this.height = { min: "2ln" }
                    this.vertically = Vertical.top
                    this.stretchingStrengthVertically = 1
                    this.model = composeInputModel({
                      icon: "fa-solid fa-search",
                      text: refs(loader).filter,
                      options: refs(loader).loaded,
                      isHotText: true,
                      isMultiLineText: false,
                    })
                    base()
                  },
                })
              }
            })
          },
        })

        rowBreak()
        statusBar()
      },
    })
  )
}

function GroupHeader(caption: string): ReactiveTreeNodeDecl<El<HTMLElement, PaneModel>> {
  return ({
    preparation() {
      this.height = { min: "30px" }
    },
    script() {
      const m = this.model
      Icon(m.isExpanded ? "fa-solid fa-chevron-down fa-fw" : "fa-solid fa-chevron-right fa-fw")
      Span({
        mode: Mode.autonomous,
        preparation() {
          this.style.fontWeight = "bold"
        },
        script() {
          const heightPx = m.heightPx
          this.native.innerText = `${caption}: ${heightPx.minPx}px..${heightPx.maxPx}px`
        }
      })
      Span({ preparation() { this.native.style.flexGrow = "1" }})
      Span({
        mode: Mode.autonomous,
        preparation() { this.native.className = "size-tag" },
        script() {
          this.native.style.display = "inline"
          const sizePx = m.partitionSizeInSplitViewPx
          const heightPx = m.heightPx
          if (equal(sizePx, heightPx.minPx) && equal(sizePx, heightPx.maxPx)) {
            this.native.innerText = "fixed"
          }
          else if (equal(sizePx, heightPx.minPx)) {
            this.native.innerText = "min"
          }
          else if (equal(sizePx, heightPx.maxPx)) {
            this.native.innerText = "max"
          }
          else {
            this.native.style.display = "none"
          }
        }
      })
      Span({
        mode: Mode.autonomous,
        preparation() { this.native.className = "effective-size" },
        script() {
          const sizePx = m.partitionSizeInSplitViewPx
          this.native.innerText = `${sizePx === 0 ? "0" : sizePx.toFixed(2)}px`
        }
      })
    },
  })
}

const EXAMPLE_CODE = `
Element size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user.

\`\`\` js
Table("Example", {
  script(b) {
    // Elements can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Alignment.left, VerticalAlignment.center)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Alignment.center, VerticalAlignment.top)
    Ruler("B", Alignment.center, VerticalAlignment.top)
    Ruler("C", Alignment.center, VerticalAlignment.top)
    rowBreak(); Ruler("2", Alignment.left, VerticalAlignment.center)
    rowBreak(); Ruler("3", Alignment.left, VerticalAlignment.center)
    // Elements can also be layed out
    // explicitly in exact cells.
    ExampleData("B2")
    ExampleData("A1:B1")
    ExampleData("C1:C2")
    ExampleData("B3:C3")
    ExampleData("A2:A3")
  },
})
\`\`\`
`
