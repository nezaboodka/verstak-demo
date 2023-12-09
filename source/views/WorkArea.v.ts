import { refs } from "reactronic"
import { Table, RxNodeDecl, Section, Note, HtmlNote, startNewRow, Align, cursor } from "verstak"
import { Theme, Toggle } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"
import { observableModel } from "common/Utils.js"

export function WorkArea(builder?: RxNodeDecl<HTMLElement, void, void>) {
  return (
    Table(builder, {
      update(b) {
        // Elements can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.ToLeft + Align.ToCenterY)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Align.ToCenterX + Align.ToTop)
        Ruler("B", Align.ToCenterX + Align.ToTop)
        Ruler("C", Align.ToCenterX + Align.ToTop)
        startNewRow(); Ruler("2", Align.ToLeft + Align.ToCenterY)
        startNewRow(); Ruler("3", Align.ToLeft + Align.ToCenterY)
        // Elements can also be layed out
        // explicitly in exact cells.
        Watch("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          initialize(b, base) {
            const app = App.actual
            b.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          update(b, base) {
            base()
            const theme = Theme.actual as AppTheme
            b.native.classList.toggle(theme.panel, true)
            b.area = "B1"
            b.elementAlignment = Align.ToRight + Align.ToBottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, align: Align) {
  return (
    Section({
      update(b) {
        b.elementAlignment = align
        b.native.style.fontSize = "smaller"
        HtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Section({
      initialize(b) {
        b.contentAlignment = Align.ToCenter
      },
      update(b) {
        const theme = Theme.actual as AppTheme
        b.area = area
        b.useStyle(theme.accent)
        Note(area)
      }
    })
  )
}
