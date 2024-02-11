import { refs, RxNodeDecl } from "reactronic"
import { Table, Section, Note, HtmlNote, startNewRow, Align, cursor, El } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(declaration, {
      formula(b) {
        // Elements can be layed out automatically
        // based on their order and line feeds.
        startNewRow()
        Ruler("1", Align.left + Align.centerY)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Align.centerX + Align.top)
        Ruler("B", Align.centerX + Align.top)
        Ruler("C", Align.centerX + Align.top)
        startNewRow()
        Ruler("2", Align.left + Align.centerY)
        startNewRow()
        Ruler("3", Align.left + Align.centerY)

        // Elements can also be layed out
        // explicitly in exact cells.
        Watch("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          activation(b, base) {
            const app = App.actual
            b.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          formula(b, base) {
            base()
            const theme = Theme.actual as AppTheme
            b.native.classList.toggle(theme.panel, true)
            b.area = "B1"
            b.boundsAlignment = Align.right + Align.bottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, align: Align) {
  return (
    Section({
      formula(b) {
        b.boundsAlignment = align
        b.native.style.fontSize = "smaller"
        HtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Section({
      activation(b) {
        b.contentAlignment = Align.center
      },
      formula(b) {
        const theme = Theme.actual as AppTheme
        b.area = area
        b.useStylingPreset(theme.accent)
        Note(area)
      }
    })
  )
}
