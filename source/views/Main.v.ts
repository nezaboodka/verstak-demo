import { Block, Grid, To, Plain, Markdown, lineFeed } from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as m from "theme/Common.m"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reacting: true,
      align: To.Top,
      render(e, b) {

        e.style.backgroundColor = "rgba(230, 230, 230)"
        ToolBar("ToolBar", {
          widthGrab: 1,
        })

        lineFeed()

        Block("NavBar", {
          mixins: [m.Panel],
          widthMin: "10rem",
          dock: To.Fit,
          render() {
            Plain("Navigation Bar")
          }
        })
        WorkArea("WorkArea", {
          mixins: [m.Panel, m.Important],
          widthGrab: 1, heightGrab: 1,
          align: To.Center + To.CenterV,
        })
        Block("Hint", {
          mixins: [m.Panel, m.Hint],
          widthMin: "16rem",
          align: To.Left,
          dock: To.Top,
          render() {
            Plain("СПРАВКА")
            lineFeed()
            Markdown("<br/><b>Верстак</b> – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.<br/><br/>Размеры блоков автоматически подстраиваются под размеры ячеек, а табличная сетка автоматически подстраивается под размеры экрана у каждого пользователя. Система хорошо подходит как для сбора воедино панелей приложения, так и для создания небольших визуальных элементов.")
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
