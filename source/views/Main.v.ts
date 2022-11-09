import { Block, Align, Plain, Markdown, rowBegin, Mark } from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import * as m from "theme/Common.m"

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
          mixins: [m.Panel],
          widthMin: "10rem",
          align: Align.Center + Align.Top,
          render() {
            Plain("Navigation Bar")
          }
        })
        Block("WorkArea", {
          mixins: [m.Panel, m.Important],
          widthGrow: 1,
          heightGrow: 1,
          align: Align.Center + Align.CenterV,
          render() {
            Markdown("<b>Verstak</b> is a front-end library<br/>for building interactive user interfaces")
          }
        })
        Block("PropInspector", {
          mixins: [m.Panel],
          widthMin: "15rem",
          widthMax: "15rem",
          align: Align.Top,
          render() {
            Plain("СПРАВКА")
            rowBegin()
            Markdown("<br/><b>Верстак</b> – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.")
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
