import { refs, Mode, ReactiveNodeDecl } from "reactronic"
import { Panel, Horizontal, Vertical, Note, rowBreak, Dimension, El, Direction } from "verstak"
import { Span, equal } from "verstak/html"
import { Markdown, Field, Theme, composeFieldModel, Icon } from "verstak/express"
import { App } from "models/App.js"
import { toolBar } from "./ToolBar.v.js"
import { statusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"
import { Pane, PaneModel } from "./Pane.v.js"

export function MainWindow() {
  return (
    Panel({
      mode: Mode.autonomous,
      preparation: el => {
        el.native.sensors.focus // enable focus global manager
        el.horizontally = Horizontal.stretch
        el.vertically = Vertical.stretch
        el.style.padding = "1em"
        el.style.gap = "1em"
        el.style.overflow = "hidden"
      },
      content: el => {
        const app = App.current
        const theme = app.theme
        Theme.current = theme
        el.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)

        toolBar()

        rowBreak()

        Panel({
          preparation: el => {
            el.splitView = Direction.horizontal
            el.horizontally = Horizontal.stretch
            el.vertically = Vertical.stretch
            const hostEl = el.node.host.element as El
            hostEl.style.flexGrow = "1"
          },
          content: el => {
            // Dimension.gFontSizePx.value = 16
            Dimension.lineSizePx = 20
            Panel({
              preparation: el => { el.splitView = Direction.vertical },
              content: el => {
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

                Note("SIDE BAR", false, {
                  preparation: el => {
                    el.height = { min: "2em", max: "2em" }
                    el.vertically = Vertical.top /* + Align.centerX */
                    el.stretchingStrengthVertically = 0
                  },
                  // content: el => {
                  //   Dimension.gFontSizePx.value = app.activeThemeIndex > 0 ? 36 : 16
                  // },
                })

                // rowBreak()
                Field({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2em", max: "4em" }
                    el.vertically = Vertical.center
                    el.stretchingStrengthVertically = 0
                    el.model = composeFieldModel({
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
                  content: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "80px", max: "320px" }
                  },
                }, {
                  content: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                // rowBreak()
                Pane({
                  preparation: el => {
                    el.useStylingPreset(app.theme.group)
                    el.height = { min: "80px", max: "320px" }
                  },
                }, {
                  content: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))

                // rowBreak()
                Panel({
                  content: el => {
                    el.vertically = Vertical.stretch
                    el.stretchingStrengthVertically = 2
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Field({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.vertically = Vertical.top
                    el.stretchingStrengthVertically = 0
                    el.model = composeFieldModel({
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
            WorkArea({
              content: (el, base) => {
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
            Panel({
              mode: Mode.autonomous,
              triggers: { theme },
              content: el => {
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
                  content: () => Markdown(EXAMPLE_CODE)
                }, GroupHeader("Group"))
                Field({
                  preparation: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.vertically = Vertical.top
                    el.stretchingStrengthVertically = 1
                    el.model = composeFieldModel({
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

function GroupHeader(caption: string): ReactiveNodeDecl<El<HTMLElement, PaneModel>> {
  return ({
    preparation: el => {
      el.height = { min: "30px" }
    },
    content: el => {
      const m = el.model
      Icon(m.isExpanded ? "fa-solid fa-chevron-down fa-fw" : "fa-solid fa-chevron-right fa-fw")
      Span({
        mode: Mode.autonomous,
        preparation: el => {
          el.style.fontWeight = "bold"
        },
        content: el => {
          const heightPx = m.heightPx
          el.native.innerText = `${caption}: ${heightPx.minPx}px..${heightPx.maxPx}px`
        }
      })
      Span({ preparation: el => el.native.style.flexGrow = "1" })
      Span({
        mode: Mode.autonomous,
        preparation: el => el.native.className = "size-tag",
        content: el => {
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
        content: el => {
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
  content(b) {
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
