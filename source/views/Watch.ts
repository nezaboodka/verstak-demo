import { Transaction, Clock, Mode } from "reactronic"
import { Section, Align, Svg, Circle, Rect, Text, G, El, Polygon } from "verstak"
import { Theme } from "verstak-express"
import { AppTheme } from "themes/AppTheme.js"
import { App } from "models/App.js"

const BackColor = "#1a3043" // "white" // "#1a3043"
const LabelColor = "#F0F0F0" // "#87F7A5"
const SecondaryLabelColor = "#909090"
const ArrowColor = "#909090" // "#1a3043" // "#93CAEC" // "#93CAEC" // "#87F7A5" // "#FFFFB7"
const AccentColor = "silver" // "#87F7A5" // "#93CAEC" // "#93CAEC" // "#87F7A5" // "#FFFFB7"
const BezelBackColor = "silver"
const BezelLabelColor = "#444444"

const clock = Transaction.run(null, () => new Clock(200))

export function Watch(area: string): El<HTMLElement> {
  return (
    Section({
      mode: Mode.IndependentUpdate,
      initialize(b) {
        const s = b.native.style
        b.contentAlignment = Align.ToCenter
        // s.fontFamily = "Arial"
        s.cursor = "default"
      },
      update(b) {
        const theme = Theme.actual as AppTheme
        b.area = area
        b.useStyle(theme.accent)
        Svg({
          update(b) {
            const svg = b.native
            svg.style.width = "48mm"
            svg.style.height = "48mm"
            svg.viewBox.baseVal.width = 1000
            svg.viewBox.baseVal.height = 1000

            Rect({
              update(b) {
                const e = b.native
                const s = e.style
                e.x.baseVal.value = 250
                e.y.baseVal.value = 0
                e.width.baseVal.value = 500
                e.height.baseVal.value = 1000
                e.rx.baseVal.value = 5
                e.ry.baseVal.value = 5
                s.stroke = "gray"
                s.fill = BezelBackColor
                s.strokeWidth = "4px"
              },
            })
            Rect({
              update(b) {
                const e = b.native
                const s = e.style
                e.x.baseVal.value = 980
                e.y.baseVal.value = 440
                e.width.baseVal.value = 70
                e.height.baseVal.value = 120
                e.rx.baseVal.value = 20
                e.ry.baseVal.value = 20
                s.stroke = "gray"
                s.fill = BezelBackColor
                s.strokeWidth = "4px"
                s.filter = "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.4))"
                rotate(e, -37.5)
              },
            })
            Circle({
              update(b) {
                const e = b.native
                const s = e.style
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 490
                s.stroke = "gray"
                s.fill = BezelBackColor
                s.strokeWidth = "3px"
                s.filter = "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.4))"
              },
            })
            Circle({
              update(b) {
                const e = b.native
                const s = e.style
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 400
                s.stroke = "gray"
                s.fill = BackColor
                s.strokeWidth = "3px"
              },
            })

            // radialDots(SecondaryLabelColor, 15, 15, 145)
            radialDashes(SecondaryLabelColor, 24, 24, 15, 145)
            // radialDashes(BackColor, 18, 18, 45, 150)
            radialDashes(AccentColor, 4, 12, 6, 108)
            // radialDashes("#87F7A5", 12, 20, 30, 108)
            radialDashes(BackColor, 14, 22, 30, 108)

            // Hours & Minutes
            radialLabels(svg, 250, 130, false, LabelColor, undefined,
              [3, 9, 15, 21], 15, 180)
            radialLabels(svg, 320, 130, false, LabelColor, undefined,
              [6, 12, 18], 15, 180)
            radialLabels(svg, 225, 130, false, LabelColor, undefined,
              [0], 15, 180)

            radialLabels(svg, 380, 40, true, SecondaryLabelColor, false,
              [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], 6, 0)
            RadialLabel(180, "Ракета", AccentColor, 275, 45, "normal", false, svg)

            const hourDeg = 180 + 360 / 24 * (clock.hour + (1 / 60 * clock.minute))
            Arrow(48, 2, 0.445, 0.12, hourDeg, 60 * 60 * 24, ArrowColor, ArrowColor, true, svg)
            //Arrow(45, 4, 0.455, 0.025, hourDeg, 60 * 60 * 24, ArrowColor, ArrowColor, true, svg)
            Arrow(48, 48, 0.095, 0.35, hourDeg, 60 * 60 * 24, ArrowColor, ArrowColor, true, svg)
            Arrow(36, 36, 0.108, 0.338, hourDeg, 60 * 60 * 24, LabelColor, LabelColor, false, svg)
            Arrow(32, 1, 0.45, 0.035, hourDeg, 60 * 60 * 24, LabelColor, LabelColor, false, svg)

            const minuteDeg = 360 / 60 * (clock.minute + (1 / 60 * clock.second))
            Arrow(32, 2, 0.584, 0.1, minuteDeg, 60 * 60, ArrowColor, ArrowColor, true, svg)
            //Arrow(28, 4, 0.629, 0.015, minuteDeg, 60 * 60, ArrowColor, ArrowColor, true, svg)
            Arrow(32, 32, 0.07, 0.51, minuteDeg, 60 * 60, ArrowColor, ArrowColor, true, svg)
            Arrow(18, 1, 0.585, 0.025, minuteDeg, 60 * 60, LabelColor, LabelColor, false, svg)
            Arrow(20, 20, 0.083, 0.498, minuteDeg, 60 * 60, LabelColor, LabelColor, false, svg)

            const secondDeg = 360 / 60 * (clock.second + (1 / 1000 * clock.ms))
            Arrow(10, 2, -0.05, 0.835, secondDeg, 60, LabelColor, LabelColor, true, svg)
            Circle({
              update(b) {
                const e = b.native
                const s = e.style
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 16
                s.stroke = ArrowColor
                s.fill = BackColor
                s.strokeWidth = "4px"
              },
            })

            // Bezel (secondary time zone)
            G({
              initialize(b) {
                b.native.style.transition = "transform 1s ease"
                b.native.onclick = () => {
                  b.native.style.transform = b.native.style.transform === "rotate(105deg)" ? "rotate(0deg)" : "rotate(105deg)"
                }
              },
              update(b) {
                b.native.style.transform = b.native.style.transform === "rotate(105deg)" ? "rotate(0deg)" : "rotate(105deg)"
                const app = App.actual
                if (app.isSecondaryTimeZoneOn)
                  rotate(b.native, 105)
                else
                  rotate(b.native, 0)
                radialDashes(SecondaryLabelColor, 24, 24, 15, 45)
                radialDashes(BezelBackColor, 26, 26, 45, 45)
                radialLabels(svg, 441, 80, false, BezelLabelColor, true,
                  [0, 6, 12, 18], 15, 180)
                radialLabels(svg, 441, 80, false, BezelLabelColor, true,
                  [3, 9, 15, 21], 15, 180)
                RadialLabel(174, "Jet", BezelLabelColor, 445, 40, "normal", true, svg)
                RadialLabel(186.5, "Lag", BezelLabelColor, 445, 40, "normal", true, svg)
              },
            })
          },
        })
      }
    })
  )
}

function rotate(e: SVGGraphicsElement, degrees: number): void {
  e.style.transformOrigin = "500px 500px"
  e.style.transform = `rotate(${degrees}deg)`
}

function radialDashes(color: string, width: number, height: number, step: number, indent: number): void {
  for (let deg = 0; deg < 360; deg += step) {
    Rect({
      update(b) {
        const e = b.native
        const s = e.style
        e.x.baseVal.value = 500 - width / 2
        e.y.baseVal.value = indent >= 0 ? indent : Math.abs(indent) - height
        e.width.baseVal.value = width
        e.height.baseVal.value = height
        s.stroke = color
        s.fill = color
        s.strokeWidth = "0"
        rotate(e, indent === 0 ? deg + 15 : deg)
      },
    })
  }
}

function radialDots(color: string, step: number, major: number, indent: number): void {
  for (let deg = 0; deg < 360; deg += step) {
    Circle({
      update(b) {
        const r = major !== 0 && deg % major === 0 ? 12 : 6
        const e = b.native
        const s = e.style
        e.cx.baseVal.value = 500
        e.cy.baseVal.value = indent
        e.r.baseVal.value = r
        s.stroke = color
        s.fill = color
        s.strokeWidth = "0"
        rotate(e, indent === 0 ? deg + 15 : deg)
      },
    })
  }
}

function Arrow(widthA: number, widthB: number, margin: number, length: number,
  degrees: number, duration: number, color: string, stroke: string,
  shadow: boolean, svg: SVGSVGElement): El<SVGPolygonElement> {
  return (
    Polygon({
      update(b) {
        const e = b.native
        const s = e.style
        const m = Math.floor(500 * margin)
        const l = Math.floor(500 * length)
        const p1 = svg.createSVGPoint()
        p1.x = 500 - widthA / 2
        p1.y = 500 - m
        const p2 = svg.createSVGPoint()
        p2.x = 500 + widthA / 2
        p2.y = 500 - m
        const p3 = svg.createSVGPoint()
        p3.x = 500 + widthB / 2
        p3.y = 500 - m - l
        const p4 = svg.createSVGPoint()
        p4.x = 500 - widthB / 2
        p4.y = 500 - m - l
        e.points.initialize(p1)
        e.points.appendItem(p2)
        e.points.appendItem(p3)
        e.points.appendItem(p4)
        s.stroke = stroke
        s.fill = color
        s.strokeWidth = "2px"
        s.filter = shadow ? "drop-shadow(3px 3px 8px rgba(0, 0, 0, 1))" : ""
        s.transformOrigin = "500px 500px"
        s.transform = `rotate(${degrees}deg)`
        // s.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function ArrowEx(segments: Array<number | string>, degrees: number,
  duration: number, color: string, stroke: string): El<SVGPolygonElement> {
  return (
    Polygon({
      update(b) {
        const e = b.native
        // const s = e.style
        // const l = Math.floor(500 * length)
        e.points.initialize(new DOMPoint(500, 500))
        // e.x.baseVal.value = 500 - width / 2
        // e.y.baseVal.value = 500 - l
        // e.width.baseVal.value = width
        // e.height.baseVal.value = l
        // e.rx.baseVal.value = rounding
        // e.ry.baseVal.value = rounding
        // s.stroke = stroke
        // s.fill = color
        // s.strokeWidth = "4px"
        // s.filter = "drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.6))"
        // s.transformOrigin = "500px 500px"
        // s.transform = `rotate(${degrees}deg)`
        // s.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function RadialLabel(degree: number, content: string, color: string,
  radius: number, size: number, weight: string, bezel: boolean | undefined,
  root: SVGSVGElement): El<SVGTextElement> {
  return (
    Text({
      update(b) {
        const e = b.native
        const s = e.style
        s.fill = color
        s.fontSize = `${size}px`
        s.fontWeight = weight
        s.textAnchor = "middle"
        degree = degree % 360
        if (degree === 90 && bezel === undefined)
          s.textAnchor = "end"
        else if (degree === 270 && bezel === undefined)
          s.textAnchor = "start"
        else
          s.textAnchor = "middle"
        if (degree === 0 && bezel === undefined)
          s.alignmentBaseline = "hanging"
        else if (degree === 180 && bezel === undefined)
          s.alignmentBaseline = "baseline"
        else
          s.alignmentBaseline = "central"
        // s.filter = bezel === true ? "drop-shadow(2px 2px 1px rgba(255, 255, 255, 0.4))" : "drop-shadow(0 0 4px rgba(0, 0, 0, 1))"
        // s.textShadow = "0 0 0.5px black"
        e.textContent = content
        s.whiteSpace = "pre"
        if (bezel !== undefined) {
          const xx = root.createSVGLength()
          xx.value = 500
          const yy = root.createSVGLength()
          yy.value = 500 + (bezel === false && (degree > 90 && degree < 270 || degree > 450) ? +radius : -radius)
          e.x.baseVal.initialize(xx)
          e.y.baseVal.initialize(yy)
          rotate(e, degree + (bezel === false && (degree > 90 && degree < 270 || degree > 450) ? -180 : 0))
        }
        else {
          const x = 500 + radius * Math.cos((degree - 90) * Math.PI / 180)
          const y = 500 + radius * Math.sin((degree - 90) * Math.PI / 180)
          const xx = root.createSVGLength()
          xx.value = x
          const yy = root.createSVGLength()
          yy.value = y
          e.x.baseVal.initialize(xx)
          e.y.baseVal.initialize(yy)
        }
      },
    })
  )
}

function radialLabels(root: SVGSVGElement,
  radius: number, size: number, bold: boolean, color: string,
  bezel: boolean | undefined, numbers: Array<number>, step: number, basis: number): void {
  for (const n of numbers) {
    let content: string
    if (basis === 180 && n === 0) {
      content = "⍿" // " ☾" // "⍿" // "⏀" // "︲" // "•" // "⏀" // "◦" // "·" // "⍿"
    }
    // else if (basis === 180 && n === 12) {
    //   content = "☀" // "⏀" // "︲" // "•" // "⏀" // "◦" // "·" // "⍿"
    // }
    // else if (basis === 180 && n === 6 && !bezel) {
    //   content = `${n} ` // "☀"
    // }
    // else if (basis === 180 && (n === 3 || n === 9) && !bezel) {
    //   content = `${n} ` // "☀"
    // }
    else {
      content = n.toString().padStart(2, "0") // " ")
      // content = n.toString() // .padEnd(2, " ") // " ")
      if (basis === 0 && n === 0)
        content = "00"
      // if (basis === 0)
      //   content = content[0] + " " + content[1]
    }
    RadialLabel(n * step + basis, content,
      color, // content !== "☀" ? color : "#FFFFB7",
      radius, size,
      bold ? "bold" : "normal", // !bezel && n % 12 !== 0 ? weight : "normal",
      bezel, root)
  }
}
