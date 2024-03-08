import { refs, RxNodeDecl } from "reactronic"
import { Table, Section, Note, rowBreak, Alignment, cursor, El, VerticalAlignment } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(declaration, {
      onChange: el => {
        // Elements can be layed out automatically
        // based on their order and line feeds.
        rowBreak()
        Ruler("1", Alignment.left, VerticalAlignment.center)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Alignment.center, VerticalAlignment.top)
        Ruler("B", Alignment.center, VerticalAlignment.top)
        Ruler("C", Alignment.center, VerticalAlignment.top)
        rowBreak()
        Ruler("2", Alignment.left, VerticalAlignment.center)
        rowBreak()
        Ruler("3", Alignment.left, VerticalAlignment.center)

        // Elements can also be layed out
        // explicitly in exact cells.
        Watch("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          onCreate: (el, base) => {
            const app = App.current
            el.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          onChange: (el, base) => {
            base()
            const theme = Theme.current as AppTheme
            el.native.classList.toggle(theme.panel, true)
            el.area = "B1"
            el.alignment = Alignment.right
            el.verticalAlignment = VerticalAlignment.bottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, alignX: Alignment, alignY: VerticalAlignment) {
  return (
    Section({
      onChange: el => {
        el.alignment = alignX
        el.verticalAlignment = alignY
        el.style.fontSize = "smaller"
        Note(`&nbsp;${title}`, true)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Section({
      onCreate: el => {
        el.alignment = Alignment.stretch
        el.verticalAlignment = VerticalAlignment.stretch
        el.alignmentInside = Alignment.center
        el.verticalAlignmentInside = VerticalAlignment.center
      },
      onChange: el => {
        const theme = Theme.current as AppTheme
        el.area = area
        el.useStylingPreset(theme.accent)
        Note(area)
      }
    })
  )
}
