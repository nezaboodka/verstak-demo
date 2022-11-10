import { Block, Grid, Align, Plain, Markdown, lineFeed } from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import * as m from "theme/Common.m"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reactor: true,
      align: Align.Top,
      render(e, b) {

        ToolBar("ToolBar", {
          widthGrab: 1,
        })

        lineFeed()

        Block("NavBar", {
          mixins: [m.Panel],
          widthMin: "10rem",
          // align: Align.Center + Align.Top,
          render() {
            Plain("Navigation Bar")
          }
        })
        Block("GridExample1", {
          mixins: [m.Panel, m.Important],
          widthGrab: 3,
          heightGrab: 1,
          render() {
            Markdown("<b>Verstak</b> is a front-end library<br/>for building interactive user interfaces")
          }
        })
        Block("GridExample2", {
          mixins: [m.Panel],
          widthGrab: 1,
          // heightGrab: 1,
          docking: Align.Bottom,
          render() {
            Plain("СПРАВКА")
            lineFeed()
            Markdown("<br/><b>Верстак</b> – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.")
          }
        })

        lineFeed()

        StatusBar("StatusBar", {
          widthGrab: 1,
        })
      },
    })
  )
}
