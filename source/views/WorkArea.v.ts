import { refs, ReactiveNodeDecl, ReactiveNode } from "reactronic"
import { RealTimeClock, Table, Division, JustText, rowBreak, Horizontal, Vertical, cursor, El, Theme, Toggle, triggeringModel } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"
import { Watch } from "./Watch.js"

export function WorkArea(clock: RealTimeClock, declaration?: ReactiveNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(ReactiveNode.withBasis(declaration, {
      script: el => {
        // Elements can be laid out automatically
        // based on their order and line feeds.
        rowBreak()
        Ruler("1", Horizontal.left, Vertical.center)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Horizontal.center, Vertical.top)
        Ruler("B", Horizontal.center, Vertical.top)
        Ruler("C", Horizontal.center, Vertical.top)
        rowBreak()
        Ruler("2", Horizontal.left, Vertical.center)
        rowBreak()
        Ruler("3", Horizontal.left, Vertical.center)

        // Elements can also be laid out
        // explicitly in exact cells.
        Watch("B2", clock)
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          preparation: (el, base) => {
            const app = DemoApp.current
            el.model = triggeringModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          script: (el, base) => {
            base()
            const theme = Theme.current as AppTheme
            el.native.classList.toggle(theme.panel, true)
            el.place = "B1"
            el.horizontally = Horizontal.right
            el.vertically = Vertical.bottom
          }
        })
      }}),
    )
  )
}

function Ruler(title: string, horizontal: Horizontal, vertical: Vertical) {
  return (
    Division({
      script: el => {
        el.horizontally = horizontal
        el.vertically = vertical
        el.style.fontSize = "smaller"
        JustText(`&nbsp;${title}`, true)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    Division({
      preparation: el => {
        el.horizontally = Horizontal.stretch
        el.vertically = Vertical.stretch
        el.contentHorizontally = Horizontal.center
        el.contentVertically = Vertical.center
      },
      script: el => {
        const theme = Theme.current as AppTheme
        el.place = place
        el.useStylingPreset(theme.accent)
        JustText(place)
      }
    })
  )
}
