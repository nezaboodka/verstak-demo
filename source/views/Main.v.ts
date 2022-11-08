import { Block, section, $, Align} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App) {
  return (
    Block(name, { observer: true }, (e, b) => {
      if (b.isInitialRendering) {
        app.sensors.listen(e)
        e.addEventListener("contextmenu", event => event.preventDefault())
        e.dataForSensor.window = app
      }

      section(s => {
        ToolBar("ToolBar", { widthGrow: 1 })
      })

      section(s => {
        Block("NavBar", {
          as: [css.Panel],
          widthMin: "10rem", align: Align.TopCenter,
        }, e => {
          $`Navigation Bar`
        })

        Block("WorkArea", {
          as: [css.Panel, css.Important],
          widthGrow: 1, heightGrow: 1, align: Align.MiddleCenter,
        }, e => {
          // work area contents can be placed here
          $`Hello, Verstak!<br/>How are you doing today?`
        })

        Block("PropInspector", {
          as: [css.Panel],
          widthMin: "15rem", widthMax: "15rem", align: Align.FitButTop,
        }, e => {
          $`СПРАВКА`
          section(s => {
            $`<br/>Верстак – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.`
          })
        })
      })

      section(() => {
        StatusBar("StatusBar", { widthGrow: 1 } )
      })
    })
  )
}
