import { refs, RxNodeDecl } from "reactronic"
import { Table, Section, Note, startNewRow, Align, cursor, El } from "verstak"
import { Theme, Toggle, observableModel } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"
import { Watch } from "./Watch.js"

export function WorkArea(declaration?: RxNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(declaration, {
      autorun: el => {
        // Elements can be layed out automatically
        // based on their order and line feeds.
        startNewRow()
        Ruler("1", Align.left + Align.centerY)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", Align.centerX + Align.top)
        Ruler("B", Align.centerX + Align.top)
        Ruler("C", Align.centerX + Align.top)
        startNewRow()
        Ruler("2", Align.left + Align.centerY)
        startNewRow()
        Ruler("3", Align.left + Align.centerY)

        // Elements can also be layed out
        // explicitly in exact cells.
        Watch("B2")
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          activation: (el, base) => {
            const app = App.current
            el.model = observableModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          autorun: (el, base) => {
            base()
            const theme = Theme.current as AppTheme
            el.native.classList.toggle(theme.panel, true)
            el.area = "B1"
            el.boundsAlignment = Align.right + Align.bottom
          }
        })
      }},
    )
  )
}

function Ruler(title: string, align: Align) {
  return (
    Section({
      autorun: el => {
        el.boundsAlignment = align
        el.native.style.fontSize = "smaller"
        Note(`&nbsp;${title}`, true)
      }
    })
  )
}

function ExampleData(area: string) {
  return (
    Section({
      activation: el => {
        el.contentAlignment = Align.center
      },
      autorun: el => {
        const theme = Theme.current as AppTheme
        el.area = area
        el.useStylingPreset(theme.accent)
        Note(area)
      }
    })
  )
}
