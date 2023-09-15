import { refs } from "reactronic"
import { Table, BlockBuilder, Section, Note, HtmlNote, startNewRow, Align, cursor } from "verstak"
import { Theme, Toggle } from "verstak-mastak"
import { AppTheme } from "themes/AppTheme"
import { App } from "models/App"
import { Watch } from "./Watch"
import { observableModel } from "common/Utils"

export function WorkArea(builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Table(builder, {
      rebuild(b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left + Align.CenterY)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Align.CenterX + Align.Top)
        Ruler("B", Align.CenterX + Align.Top)
        Ruler("C", Align.CenterX + Align.Top)
        startNewRow(); Ruler("2", Align.Left + Align.CenterY)
        startNewRow(); Ruler("3", Align.Left + Align.CenterY)
        // Blocks can also be layed out
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
          rebuild(b, base) {
            base()
            const theme = Theme.actual as AppTheme
            b.native.classList.toggle(theme.panel, true)
            b.area = "B1"
            b.blockAlignment = Align.Right + Align.Bottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, align: Align) {
  return (
    Section({
      rebuild(b) {
        b.blockAlignment = align
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
        b.contentAlignment = Align.Center
      },
      rebuild(b) {
        const theme = Theme.actual as AppTheme
        b.area = area
        b.useStyle(theme.accent)
        Note(area)
      }
    })
  )
}
