import { refs, ReactiveNodeDecl, ReactiveNode } from "reactronic"
import { Table, Panel, Note, rowBreak, Horizontal, Vertical, cursor, El } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: ReactiveNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(ReactiveNode.withBasis(declaration, {
      content: el => {
        // Elements can be layed out automatically
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

        // Elements can also be layed out
        // explicitly in exact cells.
        Watch("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          creation: (el, base) => {
            const app = App.current
            el.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          content: (el, base) => {
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
    Panel({
      content: el => {
        el.horizontally = horizontal
        el.vertically = vertical
        el.style.fontSize = "smaller"
        Note(`&nbsp;${title}`, true)
      }
    })
  )
}

function ExampleData(place: string) {
  return (
    Panel({
      creation: el => {
        el.horizontally = Horizontal.stretch
        el.vertically = Vertical.stretch
        el.contentHorizontally = Horizontal.center
        el.contentVertically = Vertical.center
      },
      content: el => {
        const theme = Theme.current as AppTheme
        el.place = place
        el.useStylingPreset(theme.accent)
        Note(place)
      }
    })
  )
}
