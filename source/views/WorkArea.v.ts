import { ReactiveTreeNodeDecl, derivative, refs } from "reactronic"
import { RealTimeClock, Table, Block, rowBreak, Horizontal, Vertical, cursor, El, Theme, Toggle, rxModel } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"
import { Watch } from "./Watch.js"

export function WorkArea(clock: RealTimeClock, declaration?: ReactiveTreeNodeDecl<El<HTMLElement, void>>) {
  return (
    Table(derivative(declaration, {
      body() {
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
          preparation(el, base) {
            const app = DemoApp.current
            this.model = rxModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          body(el, base) {
            base()
            const theme = Theme.current as AppTheme
            this.native.classList.toggle(theme.panel, true)
            this.place = "B1"
            this.horizontally = Horizontal.right
            this.vertically = Vertical.bottom
          }
        })
      }}),
    )
  )
}

function Ruler(title: string, horizontal: Horizontal, vertical: Vertical) {
  return (
    Block({
      body() {
        this.horizontally = horizontal
        this.vertically = vertical
        this.style.fontSize = "smaller"
        Block({
          body() {
            this.textIsFormatted = true
            this.text = `&nbsp;${title}`
            this.style.display = "block"
          },
        })
      },
    })
  )
}

function ExampleData(place: string) {
  return (
    Block({
      preparation() {
        this.horizontally = Horizontal.stretch
        this.vertically = Vertical.stretch
        this.contentHorizontally = Horizontal.center
        this.contentVertically = Vertical.center
      },
      body() {
        const theme = Theme.current as AppTheme
        this.place = place
        this.useStylingPreset(theme.accent)
        Block({
          body() {
            this.text = place
            this.style.display = "block"
          }
        })
      }
    })
  )
}
