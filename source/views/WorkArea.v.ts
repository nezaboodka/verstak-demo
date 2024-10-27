import { refs, RxNodeDecl, RxNode } from "reactronic"
import { Table, Panel, Note, rowBreak, PosH, PosV, cursor, El } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(RxNode.rebased(declaration, {
      script: el => {
        // Elements can be layed out automatically
        // based on their order and line feeds.
        rowBreak()
        Ruler("1", PosH.left, PosV.center)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", PosH.center, PosV.top)
        Ruler("B", PosH.center, PosV.top)
        Ruler("C", PosH.center, PosV.top)
        rowBreak()
        Ruler("2", PosH.left, PosV.center)
        rowBreak()
        Ruler("3", PosH.left, PosV.center)

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
          script: (el, base) => {
            base()
            const theme = Theme.current as AppTheme
            el.native.classList.toggle(theme.panel, true)
            el.place = "B1"
            el.horizontal = PosH.right
            el.vertical = PosV.bottom
          }
        })
      }}),
    )
  )
}

function Ruler(title: string, posH: PosH, posV: PosV) {
  return (
    Panel({
      script: el => {
        el.horizontal = posH
        el.vertical = posV
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
        el.horizontal = PosH.stretch
        el.vertical = PosV.stretch
        el.contentHorizontal = PosH.center
        el.contentVertical = PosV.center
      },
      script: el => {
        const theme = Theme.current as AppTheme
        el.place = place
        el.useStylingPreset(theme.accent)
        Note(place)
      }
    })
  )
}
