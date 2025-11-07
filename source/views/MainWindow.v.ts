import { refs, Mode, ReactiveTreeNodeDecl } from "reactronic"
import { RealTimeClock, Block, Horizontal, Vertical, JustText, rowBreak, Dimension, El, Direction, equal, Markdown, Input, Theme, composeInputModel, Icon } from "verstak"
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
      preparation: el => {
        el.native.sensors.focus // enable focus global manager
        el.horizontally = Horizontal.stretch
        el.vertically = Vertical.stretch
        el.style.padding = "1em"
        el.style.gap = "1em"
        el.style.overflow = "hidden"
      },
      script: el => {
        const app = DemoApp.current
        const theme = app.theme
        Theme.current = theme
        el.useStylingPreset(DemoApp.blinkingEffectMarker, app.isBlinkingEffectOn)

        toolBar()

        rowBreak()

        Block({
          preparation: el => {
            el.splitView = Direction.horizontal
            el.horizontally = Horizontal.stretch
            el.vertically = Vertical.stretch
            const hostEl = el.node.host.element as El
            hostEl.style.flexGrow = "1"
          },
          script: el => {
            // Dimension.gFontSizePx.value = 16
            Dimension.lineSizePx = 20
            Block({
              preparation: el => { el.splitView = Direction.vertical },
              script: el => {
                // Dimension.gFontSizePx.value = 26
                Dimension.lineSizePx = 40
                el.useStylingPreset(app.theme.panel)
                el.style.marginRight = "0.5em"
                el.width = { min: "19em" }
                el.stretchingStrengthHorizontally = 0
                el.horizontally = Horizontal.stretch
                el.vertically = Vertical.stretch
                el.contentHorizontally = Horizontal.stretch
                el.contentVertically = Vertical.top

                JustText("SIDE BAR", false, {
                  preparation: el => {
                    el.height = { min: "2em", max: "2em" }
                    el.vertically = Vertical.top /* + Align.centerX */
                    el.stretchingStrengthVertically = 0
                  },
                  // script: el => {
                  //   Dimension.gFontSizePx.value = app.activeThemeIndex > 0 ? 36 : 16
                  // },
                })

                // rowBreak()
                Input({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2em", max: "4em" }
                    el.vertically = Vertical.center
                    el.stretchingStrengthVertically = 0
                    el.model = composeInputModel({
                      icon: "fa-solid fa-search",
                      text: refs(loader).filter,
                      options: refs(loader).loaded,
                      isHotText: true,
                      isMultiLineText: false,
                    })
                    base()
                    el.style.marginBottom = "0.5em"
                  },
                })

                // rowBreak()
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "80px", max: "320px" }
                  },
                }, {
                  script: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))

                // rowBreak()
                Block({
                  script: el => {
                    el.vertically = Vertical.stretch
                    el.stretchingStrengthVertically = 2
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Input({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.vertically = Vertical.top
                    el.stretchingStrengthVertically = 0
                    el.model = composeInputModel({
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
              script: (el, base) => {
                base()
                el.useStylingPreset(theme.panel)
                el.useStylingPreset(theme.accent)
                el.style.margin = "0 0.5em"
                el.width = { min: "330px" }
                el.horizontally = Horizontal.stretch
                el.vertically = Vertical.stretch
                el.stretchingStrengthHorizontally = 3
              }
            })
            Block({
              mode: Mode.autonomous,
              triggers: { theme },
              script: el => {
                el.useStylingPreset(theme.panel)
                el.useStylingPreset(theme.markdown)
                el.style.marginLeft = "0.5em"
                el.width = { min: "300px", max: "50%" }
                el.stretchingStrengthHorizontally = 3
                el.horizontally = Horizontal.stretch
                el.vertically = Vertical.stretch
                el.contentHorizontally = Horizontal.stretch
                el.contentVertically = Vertical.top
                el.splitView = Direction.vertical
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "300px", max: "450px" }
                    el.stretchingStrengthVertically = 1
                  },
                }, {
                  script: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                Input({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.vertically = Vertical.top
                    el.stretchingStrengthVertically = 1
                    el.model = composeInputModel({
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
    preparation: el => {
      el.height = { min: "30px" }
    },
    script: el => {
      const m = el.model
      Icon(m.isExpanded ? "fa-solid fa-chevron-down fa-fw" : "fa-solid fa-chevron-right fa-fw")
      Span({
        mode: Mode.autonomous,
        preparation: el => {
          el.style.fontWeight = "bold"
        },
        script: el => {
          const heightPx = m.heightPx
          el.native.innerText = `${caption}: ${heightPx.minPx}px..${heightPx.maxPx}px`
        }
      })
      Span({ preparation: el => el.native.style.flexGrow = "1" })
      Span({
        mode: Mode.autonomous,
        preparation: el => el.native.className = "size-tag",
        script: el => {
          el.native.style.display = "inline"
          const sizePx = m.partitionSizeInSplitViewPx
          const heightPx = m.heightPx
          if (equal(sizePx, heightPx.minPx) && equal(sizePx, heightPx.maxPx)) {
            el.native.innerText = "fixed"
          }
          else if (equal(sizePx, heightPx.minPx)) {
            el.native.innerText = "min"
          }
          else if (equal(sizePx, heightPx.maxPx)) {
            el.native.innerText = "max"
          }
          else {
            el.native.style.display = "none"
          }
        }
      })
      Span({
        mode: Mode.autonomous,
        preparation: el => el.native.className = "effective-size",
        script: el => {
          const sizePx = m.partitionSizeInSplitViewPx
          el.native.innerText = `${sizePx === 0 ? "0" : sizePx.toFixed(2)}px`
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
