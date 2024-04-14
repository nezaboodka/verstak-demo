import { refs, RxNodeDecl } from "reactronic"
import { Table, Panel, Note, rowBreak, PosH, PosV, cursor, El } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(declaration, {
      onChange: el => {
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
          onCreate: (el, base) => {
            const app = App.current
            el.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          onChange: (el, base) => {
            base()
            const theme = Theme.current as AppTheme
            el.native.classList.toggle(theme.panel, true)
            el.area = "B1"
            el.horizontal = PosH.right
            el.vertical = PosV.bottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, posH: PosH, posV: PosV) {
  return (
    Panel({
      onChange: el => {
        el.horizontal = posH
        el.vertical = posV
        el.style.fontSize = "smaller"
        Note(`&nbsp;${title}`, true)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Panel({
      onCreate: el => {
        el.horizontal = PosH.stretch
        el.vertical = PosV.stretch
        el.contentHorizontal = PosH.center
        el.contentVertical = PosV.center
      },
      onChange: el => {
        const theme = Theme.current as AppTheme
        el.area = area
        el.useStylingPreset(theme.accent)
        Note(area)
      }
    })
  )
}
