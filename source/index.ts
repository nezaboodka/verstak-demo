import { launchReactiveTree, RtNode, RxObject } from "reactronic"
import { Element, El, H, V, LiveTime, ApplicationWindow, rowBreak, Fragment, KeyboardModifiers } from "verstak"
import { configureDebugging } from "dbg.js"
import { DemoApp } from "models/DemoApp.js"
import { Main } from "views/Main.v.js"
import { LightAppTheme } from "themes/LightAppTheme.s.js"
import { DarkAppTheme } from "themes/DarkAppTheme.s.js"
import { PrintAppTheme } from "themes/PrintAppTheme.s.js"

import "../index.reset.css"
import "../index.css"

// const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

launchReactiveTree(() => {
  const clock = new LiveTime(200)
  ApplicationWindow({
    creation() {
      DemoApp.current = new DemoApp(version,
        new LightAppTheme(),
        new DarkAppTheme(),
        new PrintAppTheme())
    },
    setup(el, base) {
      base()
      const theme = DemoApp.current.theme
      const s = this.style
      s.color = theme.textColor
      s.backgroundColor = theme.spaceFillColor
      this.useStylingPreset(theme.page)
      rowBreak() // WORKAROUND
      Main(clock)
    }
  })
})

// class MyApp extends RxObject {
//   paused: boolean = false
// }

// launch(() => {
//   const time = new LiveTime(11)
//   const app = new MyApp()
//   ApplicationWindow({
//     setup() {
//       const win = this
//       this.style.fontSize = "200%"
//       this.style.fontFamily = "monospace"
//       this.alignmentVertical = V.stretch
//       if (time.minute % 2 === 0) { // light
//         this.style.background = "white"
//         this.style.color = "black"
//       }
//       else { // dark
//         this.style.background = "black"
//         this.style.color = "white"
//       }
//       Block({
//         setup() {
//           this.style.fontSize = "300%"
//           // this.selfAlignmentHorizontal = H.stretch
//           if (!app.paused) {
//             Block({ setup() { this.text = digits(time.hour, 2) } })
//             Block({ setup() { this.text = ":" } })
//             Block({ setup() { this.text = digits(time.minute, 2) } })
//             Block({ setup() { this.text = ":" } })
//             Block({ setup() { this.text = digits(time.second, 2) } })
//             Block({ setup() { this.text = ":" } })
//             Block({ setup() { this.text = digits(time.ms, 3) } })
//           }
//         }
//       })
//       Fragment({
//         setup() {
//           const kb = win.native.sensors.keyboard
//           app.paused = (kb.modifiers & KeyboardModifiers.shift) !== 0
//         }
//       })
//       rowBreak()
//       Block({
//         setup() {
//           // this.alignmentVertical = V.stretch
//           // this.alignmentHorizontal = H.stretch
//           // this.selfAlignmentVertical = V.stretch
//           // this.selfAlignmentHorizontal = H.stretch
//           // this.selfAlignmentVertical = V.stretch
//           Block({
//             setup() {
//               // this.alignmentHorizontal = H.left
//               this.selfAlignmentHorizontal = H.stretch
//               this.style.border = "1px solid #80808040"
//               this.style.borderRadius = "0.25em"
//               this.style.margin = "0.5em"
//               this.textIsEditable = true
//               this.text = ""
//             }
//           })
//           rowBreak()
//           Button("1")
//           Button("2")
//           Button("3"); rowBreak()
//           Button("4")
//           Button("5")
//           Button("6"); rowBreak()
//           Button("7")
//           Button("8")
//           Block({
//             setup() {
//               // this.selfAlignmentVertical = V.stretch
//               this.style.background = "#80808020"
//               this.style.borderRadius = "0.5em"
//               // this.style.padding = "1em"
//               this.style.width = "3em"
//               this.style.minHeight = "3em"
//               // this.style.aspectRatio = "1/1"
//               this.style.margin = "0.25em"
//               this.textIsFormatted = true
//               this.text = "9"
//             }
//           })
//           rowBreak()
//           Button("0")
//         }
//       })
//     }
//   })
// })

// function digits(value: number, count: number): string {
//   return value.toString().padStart(count, "0")
// }

// function Button(caption: string): RtNode<El<HTMLElement, void>> {
//   return (Block({
//     setup() {
//       //this.alignmentVertical = V.top
//       // this.alignmentHorizontal = H.stretch
//       this.style.background = "#80808020"
//       this.style.borderRadius = "0.5em"
//       // this.style.padding = "1em"
//       this.style.width = "3em"
//       this.style.minHeight = "3em"
//       // this.style.aspectRatio = "1/1"
//       this.style.margin = "0.25em"
//       this.textIsFormatted = true
//       this.text = caption
//     }
//   }))
// }

// console.log(WebDriver.getOwnNodeOfNativeElement(win.element.native))
// console.log(win.lookupTreeNodeByUri("node://·A·Window@index.ts:17:3/·B·MainWindow@index.ts:34:5/Theme"))
