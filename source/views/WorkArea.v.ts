import { Table, BlockBuilder, Band, Note, HtmlNote, fromNewRow, Align, cursor } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function WorkArea(builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    Table(builder, {
      render(b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left + Align.CenterY)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Align.CenterX + Align.Top)
        Ruler("B", Align.CenterX + Align.Top)
        Ruler("C", Align.CenterX + Align.Top)
        fromNewRow(); Ruler("2", Align.Left + Align.CenterY)
        fromNewRow(); Ruler("3", Align.Left + Align.CenterY)
        // Blocks can also be layed out
        // explicitly in exact cells.
        ExampleData("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
      }},
    )
  )
}

function Ruler(title: string, align: Align) {
  return (
    Band({
      render(b) {
        b.blockAlignment = align
        b.native.style.fontSize = "smaller"
        HtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.area = area
        b.style(theme.accent)
        Note(area)
      }
    })
  )
}
