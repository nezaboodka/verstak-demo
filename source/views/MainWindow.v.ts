import { refs, Mode, RxNodeDecl } from "reactronic"
import { Section, Align, Note, rowBreak, SplitView, Dimension, Span, El, equal } from "verstak"
import { Markdown, Field, Theme, composeFieldModel, observableModel, Icon } from "verstak-express"
import { App } from "models/App.js"
import { toolBar } from "./ToolBar.v.js"
import { statusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"
import { Pane, PaneModel } from "./Pane.v.js"
import { Pane2 } from "./Pane2.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.independentUpdate,
      onCreate: el => {
        el.native.sensors.focus // enable focus global manager
        el.alignment = Align.stretchXY
        el.style.padding = "1em"
        el.style.gap = "1em"
        el.style.overflow = "hidden"
      },
      onChange: el => {
        const app = App.current
        const theme = app.theme
        Theme.current = theme
        el.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)

        toolBar()

        rowBreak()

        Section({
          onCreate: el => {
            el.splitView = SplitView.horizontal
            el.alignment = Align.stretchXY
            const hostEl = el.node.host.element as El
            hostEl.style.flexGrow = "1"
          },
          onChange: el => {
            // Dimension.gFontSizePx.value = 16
            Dimension.lineSizePx = 20
            Section({
              onCreate: el => { el.splitView = SplitView.vertical },
              onChange: el => {
                // Dimension.gFontSizePx.value = 26
                Dimension.lineSizePx = 40
                el.useStylingPreset(app.theme.panel)
                el.style.marginRight = "0.5em"
                el.width = { min: "19em" }
                el.stretchingStrengthX = 0
                el.alignment = Align.stretchXY
                el.alignmentInside = Align.top + Align.stretchX

                Note("SIDE BAR", false, {
                  onCreate: el => {
                    el.height = { min: "2em", max: "2em" }
                    el.alignment = Align.top
                    el.stretchingStrengthY = 0
                  },
                  // onChange: el => {
                  //   Dimension.gFontSizePx.value = app.activeThemeIndex > 0 ? 36 : 16
                  // },
                })

                // rowBreak()
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2em", max: "4em" }
                    el.alignment = Align.centerY
                    el.stretchingStrengthY = 0
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
                  onCreate: (p, base) => {
                    p.useStylingPreset(app.theme.group)
                    p.model = observableModel<PaneModel>({
                      isExpanded: true,
                      headerSizePx: { min: 20, max: 20 },
                      bodySizePx: { min: 60, max: 300 },
                      header: GroupHeader("Group", p),
                      body: {
                        key: "body", // get rid of this key
                        onChange: (el, base) => {
                          Markdown(EXAMPLE_CODE)
                          base()
                        }
                      },
                    })
                    base()
                  },
                })

                // rowBreak()
                Section({
                  onChange: el => {
                    el.alignment = Align.stretchY
                    el.stretchingStrengthY = 2
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.alignment = Align.top
                    el.stretchingStrengthY = 0
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
              onChange: (el, base) => {
                base()
                el.useStylingPreset(theme.panel)
                el.useStylingPreset(theme.accent)
                el.style.margin = "0 0.5em"
                el.width = { min: "330px" }
                el.alignment = Align.stretchXY
                el.stretchingStrengthX = 3
              }
            })
            Section({
              mode: Mode.independentUpdate,
              triggers: { theme },
              onChange: el => {
                el.useStylingPreset(theme.panel)
                el.useStylingPreset(theme.markdown)
                el.style.marginLeft = "0.5em"
                el.width = { min: "300px", max: "50%" }
                el.stretchingStrengthX = 3
                el.alignment = Align.stretchXY
                el.alignmentInside = Align.left + Align.top
                Pane2({
                  onCreate: el => {
                    el.useStylingPreset(app.theme.group)
                    el.model.header = {
                      onCreate: el => {
                        el.height = { min: "20px", max: "2em" }
                      }
                    }
                    el.model.isHeaderVisible = true
                  },
                  onChange: el => {
                    el.height = { min: "300px" }
                    el.alignment = Align.stretchY
                    el.stretchingStrengthY = 1
                    Markdown(EXAMPLE_CODE)
                  },
                })
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.alignment = Align.top
                    el.stretchingStrengthY = 0
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
                el.splitView = SplitView.vertical
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

function GroupHeader(caption: string, partitionElement: El<HTMLElement>): RxNodeDecl<El<HTMLElement, PaneModel>> {
  return ({
    onChange: (el, base) => {
      Icon(el.model.isExpanded ? "fa-solid fa-chevron-down fa-fw" : "fa-solid fa-chevron-right fa-fw")
      Span({
        mode: Mode.independentUpdate,
        onCreate: el => {
          el.style.fontWeight = "bold"
        },
        onChange: el => {
          const heightPx = partitionElement.heightPx
          el.native.innerText = `${caption}: ${heightPx.minPx}px..${heightPx.maxPx}px`
        }
      })
      Span({ onCreate: el => el.native.style.flexGrow = "1" })
      Span({
        mode: Mode.independentUpdate,
        onCreate: el => el.native.className = "size-tag",
        onChange: el => {
          el.native.style.display = "inline"
          const sizePx = partitionElement.partitionSizeInSplitViewPx
          const heightPx = partitionElement.heightPx
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
        mode: Mode.independentUpdate,
        onCreate: el => el.native.className = "effective-size",
        onChange: el => {
          const sizePx = partitionElement.partitionSizeInSplitViewPx
          el.native.innerText = `${sizePx === 0 ? "0" : sizePx.toFixed(2)}px`
        }
      })
      base()
    },
  })
}

const EXAMPLE_CODE = `
Element size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user.

\`\`\` js
Table("Example", {
  update(b) {
    // Elements can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", Align.left | Align.centerY)
    cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
    Ruler("A", Align.centerX | Align.top)
    Ruler("B", Align.centerX | Align.top)
    Ruler("C", Align.centerX | Align.top)
    rowBreak(); Ruler("2", Align.left | Align.centerY)
    rowBreak(); Ruler("3", Align.left | Align.centerY)
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
