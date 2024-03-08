import { refs, Mode } from "reactronic"
import { Section, Alignment, VerticalAlignment, Note, rowBreak, SplitView, Dimension } from "verstak"
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
        el.alignment = Alignment.stretch
        el.verticalAlignment = VerticalAlignment.stretch
        el.style.padding = "1em"
        el.style.gap = "1em"

        toolBar()

        rowBreak()

        Section({
          onCreate: el => {
            el.alignment = Alignment.stretch
            el.verticalAlignment = VerticalAlignment.stretch
            // el.style.gap = "1em"
          },
          onChange: el => {
            // Dimension.gFontSizePx.value = 16
            Dimension.lineSizePx = 20
            el.splitView = app.isSplitViewOn ? SplitView.horizontal : undefined
            Section({
              onChange: el => {
                // Dimension.gFontSizePx.value = 26
                Dimension.lineSizePx = 40
                el.useStylingPreset(app.theme.panel)
                el.style.marginRight = "0.5em"
                el.width = { min: "15em" }
                el.stretchingStrengthX = 0
                el.alignment = Alignment.stretch
                el.verticalAlignment = VerticalAlignment.stretch
                el.verticalAlignmentInside = VerticalAlignment.top
                el.splitView = app.isSplitViewOn ? SplitView.vertical : undefined

                Note("Side Bar", false, {
                  onCreate: el => {
                    el.height = { min: "2em" }
                    el.verticalAlignment = VerticalAlignment.top /* + Align.centerX */
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
                    el.height = { min: "2em" }
                    el.verticalAlignment = VerticalAlignment.bottom
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
                    el.verticalAlignment = VerticalAlignment.stretch
                    el.stretchingStrengthY = 1
                    // el.height = { max: "600px" }
                  }
                })

                // rowBreak()
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.verticalAlignment = VerticalAlignment.top
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
                el.width = { min: "300px" }
                el.alignment = Alignment.stretch
                el.verticalAlignment = VerticalAlignment.stretch
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
                el.style.marginLeft = "0.5em"
                el.width = { min: "300px", max: "50%" }
                el.stretchingStrengthX = 3
                el.alignment = Alignment.stretch
                el.verticalAlignment = VerticalAlignment.stretch
                el.alignmentInside = Alignment.left
                el.verticalAlignmentInside = VerticalAlignment.top
                Section({
                  onChange: el => {
                    el.height = { min: "300px" }
                    el.alignment = Alignment.stretch
                    el.verticalAlignment = VerticalAlignment.stretch
                    el.stretchingStrengthY = 1
                    Markdown(EXAMPLE_CODE)
                  },
                })
                Field({
                  onCreate: (el, base) => {
                    const loader = app.loader
                    el.width = { min: "10em" }
                    el.height = { min: "2ln" }
                    el.verticalAlignment = VerticalAlignment.top
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
