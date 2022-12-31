import { Grid, BlockBody, Block, PlainText, HtmlText, lineFeed, Align } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function WorkArea(body?: BlockBody<HTMLElement, void, void>) {
  return (
    Grid(body, {
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
    Block({
      render(b) {
        b.frameAlignment = frameAlignment
        b.cells = { horizontalOverlap: overlap }
        b.native.style.fontSize = "smaller"
        HtmlText(`&nbsp;${title}`)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    Block({
      initialize(b) {
        b.contentAlignment = Align.Center + Align.CenterV
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.cells = place
        b.style(theme.accent)
        PlainText(place)
      }
    })
  )
}
