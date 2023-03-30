import { VTable, BlockBuilder, VBand, VNote, VHtmlNote, fromNewRow, Align } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function WorkArea(builder?: BlockBuilder<HTMLElement, void, void>) {
  return (
    VTable(builder, {
      render(b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left + Align.CenterY, 0)
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

function Ruler(title: string, align: Align, cursorWidth?: number, cursorHeight?: number) {
  return (
    VBand({
      render(b) {
        b.blockAlignment = align
        b.placement = { cursorWidth, cursorHeight }
        b.native.style.fontSize = "smaller"
        VHtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    VBand({
      initialize(b) {
        b.contentAlignment = Align.Center
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.placement = place
        b.style(theme.accent)
        VNote(place)
      }
    })
  )
}
