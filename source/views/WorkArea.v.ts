import { Table, BlockBody, Ribbon, Note, HtmlNote, lineFeed, Align } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function WorkArea(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Table(body, {
      render(b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left, true)
        Ruler("A", Align.Top + Align.Center)
        Ruler("B", Align.Top + Align.Center)
        Ruler("C", Align.Top + Align.Center); lineFeed()
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

function Ruler(title: string, frameAlignment: Align, overlap?: boolean) {
  return (
    Ribbon({
      render(b) {
        b.frameAlignment = frameAlignment
        b.bounds = { widthOverlap: overlap }
        b.native.style.fontSize = "smaller"
        HtmlNote(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    Ribbon({
      initialize(b) {
        b.contentAlignment = Align.Center + Align.CenterV
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
