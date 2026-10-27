import { Conf, inherit, refs } from "reactronic"
import { LiveTime, Table, Element, rowBreak, H, V, cursor, El, Theme, Toggle, rxModel } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { DemoApp } from "models/DemoApp.js"
import { Watch } from "./Watch.js"

export function WorkArea(clock: LiveTime, description?: Conf<El<HTMLElement, void>>) {
  return (
    Table(inherit(description, {
      setup() {
        // Elements can be laid out automatically
        // based on their order and line feeds.
        rowBreak()
        Ruler("1", H.left, V.center)
        cursor({ cellsOverWidth: -1, cellsOverHeight: 0 })
        Ruler("A", H.center, V.top)
        Ruler("B", H.center, V.top)
        Ruler("C", H.center, V.top)
        rowBreak()
        Ruler("2", H.left, V.center)
        rowBreak()
        Ruler("3", H.left, V.center)

        // Elements can also be laid out
        // explicitly in exact cells.
        Watch("B2", clock)
        ExampleData("A1:B1")
        ExampleData("C1:C2")
        ExampleData("B3:C3")
        ExampleData("A2:A3")
        Toggle({ key: "SecondaryTimeZone",
          creation(el, base) {
            const app = DemoApp.current
            this.model = rxModel({
              label: "Watch Bezel",
              checked: refs(app).isSecondaryTimeZoneOn,
            })
            base()
          },
          setup(el, base) {
            base()
            const theme = Theme.current as AppTheme
            this.native.classList.toggle(theme.panel, true)
            this.place = "B1"
            this.selfAlignmentHorizontal = H.right
            this.selfAlignmentVertical = V.bottom
          }
        })
      }
    }))
  )
}

function Ruler(title: string, horizontal: H, vertical: V) {
  return (
    Element({
      setup() {
        this.selfAlignmentHorizontal = horizontal
        this.selfAlignmentVertical = vertical
        this.style.fontSize = "smaller"
        Element({
          setup() {
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
    Element({
      creation() {
        this.selfAlignmentHorizontal = H.stretch
        this.selfAlignmentVertical = V.stretch
        this.alignmentHorizontal = H.center
        this.alignmentVertical = V.center
      },
      setup() {
        const theme = Theme.current as AppTheme
        this.place = place
        this.useStylingPreset(theme.accent)
        Element({
          setup() {
            this.text = place
            this.style.display = "block"
          }
        })
      }
    })
  )
}
