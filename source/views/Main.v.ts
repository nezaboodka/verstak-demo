import { Block, Align, rowBegin, $html, Txt} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reactor: true,
      render(e, b) {
        rowBegin()

        ToolBar("ToolBar", {
          widthGrow: 1,
        })

        rowBegin()

        Block("NavBar", {
          reuse: [css.Panel],
          widthMin: "10rem",
          align: Align.TopCenter,
          render() {
            Txt("Navigation Bar")
          }
        })
        Block("WorkArea", {
          reuse: [css.Panel, css.Important],
          widthGrow: 1,
          heightGrow: 1,
          align: Align.MiddleCenter,
          render() {
            $html`<b>Verstak</b> is a front-end library<br/>for building interactive user interfaces`
          }
        })
        Block("PropInspector", {
          reuse: [css.Panel],
          widthMin: "15rem", widthMax: "15rem",
          align: Align.FitButTop,
          render() {
            $html`СПРАВКА`
            rowBegin()
            $html`<br/><b>Верстак</b> – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.`
          }
        })

        rowBegin()

        StatusBar("StatusBar", {
          widthGrow: 1,
        })
      },
    })
  )
}
