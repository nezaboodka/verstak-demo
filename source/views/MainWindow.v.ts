import { refs, Mode } from "reactronic"
import { Section, Align, Note, rowBreak, SplitView, Dimension } from "verstak"
import { Markdown, Field, Theme, composeFieldModel } from "verstak-express"
import { App } from "models/App.js"
import { toolBar } from "./ToolBar.v.js"
import { statusBar } from "./StatusBar.v.js"
import { WorkArea } from "./WorkArea.v.js"

export function MainWindow() {
  return (
    Section({
      mode: Mode.independentUpdate,
      onCreate: el => {
        el.native.sensors.focus // enable focus global manager
        el.style.overflow = "hidden"
      },
      onChange: el => {
        const app = App.current
        const theme = app.theme
        Theme.current = theme

        el.useStylingPreset(App.blinkingEffectMarker, app.isBlinkingEffectOn)
        el.alignment = Align.stretchXY
        // el.style.padding = "1em"
        // el.style.gap = "1em"

        toolBar()

        rowBreak()

        Section({
          onCreate: el => {
            el.alignment = Align.stretchXY
            //el.style.gap = "1em"
          },
          onChange: el => {
            Dimension.lineSizePx = 20
            el.splitView = app.isSplitViewOn ? SplitView.horizontal : undefined
            Section({
              onChange: el => {
                Dimension.lineSizePx = 40
                el.useStylingPreset(app.theme.panel)
                el.width = { min: "12em" }
                el.alignment = Align.stretchXY
                el.extraAlignment = Align.top
                el.splitView = app.isSplitViewOn ? SplitView.vertical : undefined

                Note("Navigation Bar", false, {
                  onCreate: el => {
                    el.height = { min: "500px" }
                    el.alignment = Align.top /* + Align.centerX */
                  },
                  // onChange: el => {
                  //   Dimension.fontSizePx = app.fontSizePx
                  // }
                })

                // rowBreak()
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "400px" }
                    el.alignment = Align.top
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

                // rowBreak()
                Section({
                  onChange: el => {
                    el.alignment = Align.stretchY
                    el.stretchingStrengthY = 1
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "1.5em" }
                    el.alignment = Align.top
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
                el.width = { min: "300px" }
                el.alignment = Align.stretchXY
                el.stretchingStrengthX = 3
              }
            })
            Section({
              mode: Mode.independentUpdate,
              triggers: { theme },
              onChange: el => {
                el.splitView = app.isSplitViewOn ? SplitView.vertical : undefined
                el.useStylingPreset(theme.panel)
                el.useStylingPreset(theme.markdown)
                el.width = { min: "300px", max: "40%" }
                el.stretchingStrengthX = 3
                el.alignment = Align.stretchXY
                el.extraAlignment = Align.left + Align.top
                Section({
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
                    el.height = { min: "1.5em" }
                    el.alignment = Align.top
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
