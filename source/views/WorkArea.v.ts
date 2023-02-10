import { Table, BlockBody, Chain, Note, HtmlNote, lineFeed, Align } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function WorkArea(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Table(body, {
      render(b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left, true)
        Ruler("A", Align.Top + Align.CenterOfWidth)
        Ruler("B", Align.Top + Align.CenterOfWidth)
        Ruler("C", Align.Top + Align.CenterOfWidth); lineFeed()
        Ruler("2", Align.Left); lineFeed()
        Ruler("3", Align.Left); lineFeed()
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

function Ruler(title: string, align: Align, overlap?: boolean) {
  return (
    Chain({
      render(b) {
        b.blockAlignment = align
        b.bounds = { widthOverlap: overlap }
        b.native.style.fontSize = "smaller"
        HtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    Chain({
      initialize(b) {
        b.contentAlignment = Align.Center
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.bounds = place
        b.style(theme.accent)
        Note(place)
      }
    })
  )
}
