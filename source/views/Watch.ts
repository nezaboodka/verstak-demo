import { Band, Align, Svg, Circle, Rect, Text, TextPath, G, Block, Polygon, Label } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { $app } from "models/App"

const BackColor = "white" // "white" // "#1a3043"
const LabelColor = "black" // "#87F7A5"
const SecondaryLabelColor = "darkred" // "#87F7A5"
const ArrowColor = "black" // "#87F7A5" // "#93CAEC" // "#93CAEC" // "#87F7A5" // "#FFFFB7"
const BezelColor = "silver"

// const BackColor = "white"
// const LabelColor = "#555555"
// const ArrowColor = "#333333" // "#87F7A5" // "#93CAEC" // "#93CAEC" // "#87F7A5" // "#FFFFB7"

export function Watch(area: string): Block<HTMLElement> {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
        b.native.style.lineHeight = "0.8"
        b.native.style.fontFamily = "tektur"
        b.native.style.cursor = "default"
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.area = area
        b.style(theme.accent)
        Svg({
          render(b) {
            const svg = b.native
            svg.style.width = "47mm"
            svg.style.height = "47mm"
            svg.viewBox.baseVal.width = 1000
            svg.viewBox.baseVal.height = 1000

            Rect({
              render(b) {
                const e = b.native
                e.x.baseVal.value = 250
                e.y.baseVal.value = 0
                e.width.baseVal.value = 500
                e.height.baseVal.value = 1000
                e.rx.baseVal.value = 5
                e.ry.baseVal.value = 5
                e.style.stroke = "gray"
                e.style.fill = BezelColor
                e.style.strokeWidth = "4px"
              },
            })
            Rect({
              render(b) {
                const e = b.native
                e.x.baseVal.value = 980
                e.y.baseVal.value = 440
                e.width.baseVal.value = 70
                e.height.baseVal.value = 120
                e.rx.baseVal.value = 20
                e.ry.baseVal.value = 20
                e.style.stroke = "gray"
                e.style.fill = BezelColor
                e.style.strokeWidth = "4px"
                e.style.filter = "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.4))"
                rotate(e, -37.5)
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 490
                e.style.stroke = "gray"
                e.style.fill = BezelColor
                e.style.strokeWidth = "3px"
                e.style.filter = "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.4))"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 400
                e.style.stroke = "gray"
                e.style.fill = BackColor
                e.style.strokeWidth = "3px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 360
                e.style.stroke = BezelColor
                e.style.fill = "transparent"
                e.style.strokeWidth = "3px"
              },
            })
            // Circle({
            //   render(b) {
            //     const e = b.native
            //     e.cx.baseVal.value = 500
            //     e.cy.baseVal.value = 500
            //     e.r.baseVal.value = 230
            //     e.style.stroke = LabelColor
            //     e.style.fill = "transparent"
            //     e.style.strokeWidth = "3px"
            //   },
            // })
            // Circle({
            //   render(b) {
            //     const e = b.native
            //     e.cx.baseVal.value = 500
            //     e.cy.baseVal.value = 500
            //     e.r.baseVal.value = 200
            //     e.style.stroke = LabelColor
            //     e.style.fill = "transparent"
            //     e.style.strokeWidth = "3px"
            //   },
            // })

            radialDashes("gray", 4, 32, 15, 155)
            // radialDashes(BackColor, 24, 48, 45, 105)
            radialDashes(LabelColor, 12, 32, 45, 155)
            // radialDots(LabelColor, 15, 15, 120)
            // radialDots(BackColor, 180, 180, 160)
            radialDashes("gray", 4, 16, 6, 110)
            radialDashes(SecondaryLabelColor, 16, 16, 30, 110)
            radialDashes(BackColor, 20, 20, 180, 110)
            //radialDashes(SecondaryLabelColor, 2, 4, 60, 300)
            // radialDashes(SecondaryLabelColor, 12, 24, 30, 280)
            // radialDashes(BackColor, 8, 20, 60, 280)
            // radialDashes(BackColor, 8, 20, 60, 640)
            // radialDashes(LabelColor, 4, 4, 15, 180)
            // radialDots(LabelColor, 15, 45, 185)
            //radialDots(AccentColor, 30, 30, 130)
            // radialDots(LabelColor, 6, 30, 320)
            // radialDots(BackColor, 60, 60, 120)
            // radialDots(AccentColor, 360, 180, 115)
            // radialDashes(LabelColor, 45, 45, 250)
            // radialDots("magenta", 15, 30, 0)

            // Hours & Minutes
            radialLabels(svg, 240, 75, false, LabelColor, undefined,
              [3, 6, 12, 15, 21], 15, 180)
            radialLabels(svg, 235, 135, true, LabelColor, undefined,
              [9, 18], 15, 180)
            radialLabels(svg, 240, 135, true, LabelColor, undefined,
              [0], 15, 180)
            // radialLabels(svg, 245, 75, false, LabelColor, undefined,
            //   [0, 6, 12, 18], 15, 180)
            // radialLabels(svg, 240, 125, true, LabelColor, undefined,
            //   [3, 9, 15, 21], 15, 180)
            // radialLabels(svg, 320, 75, true, LabelColor, undefined,
            //   [0, 6, 12, 18], 15, 180)
            // radialLabels(svg, 300, 125, true, LabelColor, undefined,
            //   [3, 9, 15, 21], 15, 180)
            // radialLabels(svg, 285, 40, false, LabelColor, undefined,
            //   [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23], 15, 180)
            radialLabels(svg, 380, 40, true, SecondaryLabelColor, false,
              [0], 6, 0)
            radialLabels(svg, 383, 40, true, SecondaryLabelColor, false,
              [30], 6, 0)
            RadialLabel(180, "Ракета", LabelColor, 130, 50, "normal", false, svg)
            // RadialLabel(193, "Р", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(188, "А", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(183, "К", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(177, "Е", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(172, "Т", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(167, "А", LabelColor, 340, 40, "normal", false, svg)
            // RadialLabel(0, "Дважды 24", LabelColor, 80, 40, "normal", undefined, svg)
            // RadialLabel(324, "О", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(328, "С", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(332, "Н", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(335, ".", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(339, "П", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(343, "О", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(347, "Я", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(351, "С", ArrowColor, 340, 35, "bold", false, svg)
            // RadialLabel(262, "Н", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(266, "А", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(273, "С", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(277, "Т", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(281, "А", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(285, "Р", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(289, "Т", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(308, "!", LabelColor, 330, 45, "normal", true, svg)
            // RadialLabel(235, "В", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(239, "О", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(243, "С", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(247, "Х", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(251, "О", LabelColor, 315, 35, "bold", true, svg)
            // RadialLabel(255, "Д", LabelColor, 315, 35, "bold", true, svg)
            // Arrows
            // Arrow(1, 1, -0.05, 0.700, 277, 60 * 60 * 24, BackColor, BackColor, true, svg)
            // RadialLabel(277, "☀", "black", 280, 200, "normal", false, svg)
            // RadialLabel(277, "•", "yellow", 300, 250, "normal", false, svg)
            // Arrow(8, 8, 0.5, 0.2, 277, 60 * 60 * 24, "yellow", "yellow", true, svg)
            // RadialLabel(312, "☀", "#FFFFB7", 330, 150, "normal", true, svg)
            // Arrow(50, 2, 0.6775, 0.1, 277, 60 * 60 * 24, LabelColor, LabelColor, true, svg)
            //Arrow(70, 0.285, 0.150, true, 78, 60 * 60 * 24, ArrowColor, "rgba(0, 0, 0, 0.5)", svg)
            Arrow(40, 4, 0.35, 0.025, 71, 60 * 60 * 24, ArrowColor, ArrowColor, true, svg)
            // Arrow(2, 2, 0.3, 0.35, 281, 60 * 60 * 24, "transparent", BackColor, true, svg)
            Arrow(40, 40, -0.05, 0.40, 71, 60 * 60 * 24, ArrowColor, ArrowColor, true, svg)
            Arrow(16, 16, -0.1, 0.7, 295, 60 * 60, SecondaryLabelColor, SecondaryLabelColor, true, svg)
            Arrow(16, 4, 0.6, 0.015, 295, 60 * 60, SecondaryLabelColor, SecondaryLabelColor, true, svg)
            Arrow(10, 2, -0.1, 0.835, 0, 60, SecondaryLabelColor, SecondaryLabelColor, true, svg)
            // Arrow(20, 0.445, 0.250, true, 47.5, 60 * 60, ArrowColor, "black", svg)
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 16
                e.style.stroke = "black"
                e.style.fill = BackColor
                e.style.strokeWidth = "2px"
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
              render(b) {
                b.native.style.transform = b.native.style.transform === "rotate(105deg)" ? "rotate(0deg)" : "rotate(105deg)"
                const app = $app.value
                if (app.secondaryTimeZone)
                  rotate(b.native, 105)
                else
                  rotate(b.native, 0)
                // radialDashes("#555555", 4, 10, 15, 87)
                // radialLabels(svg, 435, 50, false, LabelColor, true,
                //   [0, 12], 15, 180)
                radialLabels(svg, 441, 80, true, LabelColor, true,
                  [9, 18, 0], 15, 180)
                radialLabels(svg, 443, 50, false, LabelColor, true,
                  [3, 6, 12, 15, 21], 15, 180)
                // RadialLabel(260, "Н", "black", 467, 35, "bold", true, svg)
                // RadialLabel(264, "А", "black", 467, 35, "bold", true, svg)
                // RadialLabel(275, "С", "black", 467, 35, "bold", true, svg)
                // RadialLabel(279, "Т", "black", 467, 35, "bold", true, svg)
                // RadialLabel(283, "А", "black", 467, 35, "bold", true, svg)
                // RadialLabel(287, "Р", "black", 467, 35, "bold", true, svg)
                // RadialLabel(291, "Т", "black", 467, 35, "bold", true, svg)
                // RadialLabel(324, "Д", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(328, "О", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(332, "П", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(335, ".", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(339, "П", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(343, "О", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(347, "Я", BackColor, 470, 35, "bold", true, svg)
                // RadialLabel(351, "С", BackColor, 470, 35, "bold", true, svg)
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
      render(b) {
        const e = b.native
        e.x.baseVal.value = 500 - width / 2
        e.y.baseVal.value = indent >= 0 ? indent : Math.abs(indent) - height
        e.width.baseVal.value = width
        e.height.baseVal.value = height
        e.style.stroke = color
        e.style.fill = color
        e.style.strokeWidth = "0"
        rotate(e, indent === 0 ? deg + 15 : deg)
      },
    })
  }
}

function radialDots(color: string, step: number, major: number, indent: number): void {
  for (let deg = 0; deg < 360; deg += step) {
    Circle({
      render(b) {
        const r = major !== 0 && deg % major === 0 ? 14 : 6
        const e = b.native
        e.cx.baseVal.value = 500
        e.cy.baseVal.value = indent
        e.r.baseVal.value = r
        e.style.stroke = color
        e.style.fill = color
        e.style.strokeWidth = "0"
        rotate(e, indent === 0 ? deg + 15 : deg)
      },
    })
  }
}

function Arrow(widthA: number, widthB: number, margin: number, length: number,
  degrees: number, duration: number, color: string, stroke: string,
  shadow: boolean, svg: SVGSVGElement): Block<SVGPolygonElement> {
  return (
    Polygon({
      render(b) {
        const e = b.native
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
        e.style.stroke = stroke
        e.style.fill = color
        e.style.strokeWidth = "2px"
        e.style.filter = shadow ? "drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.6))" : ""
        e.style.transformOrigin = "500px 500px"
        e.style.transform = `rotate(${degrees}deg)`
        e.style.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function ArrowEx(segments: Array<number | string>, degrees: number,
  duration: number, color: string, stroke: string): Block<SVGPolygonElement> {
  return (
    Polygon({
      render(b) {
        const e = b.native
        const l = Math.floor(500 * length)
        e.points.initialize(new DOMPoint(500, 500))
        // e.x.baseVal.value = 500 - width / 2
        // e.y.baseVal.value = 500 - l
        // e.width.baseVal.value = width
        // e.height.baseVal.value = l
        // e.rx.baseVal.value = rounding
        // e.ry.baseVal.value = rounding
        // e.style.stroke = stroke
        // e.style.fill = color
        // e.style.strokeWidth = "4px"
        // e.style.filter = "drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.6))"
        // e.style.transformOrigin = "500px 500px"
        // e.style.transform = `rotate(${degrees}deg)`
        // e.style.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function RadialLabel(degree: number, content: string, color: string,
  radius: number, size: number, weight: string, bezel: boolean | undefined,
  root: SVGSVGElement): Block<SVGTextElement> {
  return (
    Text({
      render(b) {
        const e = b.native
        e.style.fill = color
        e.style.fontSize = `${size}px`
        e.style.fontWeight = weight
        e.style.textAnchor = "middle"
        e.style.alignmentBaseline = "central"
        // e.style.filter = bezel === true ? "drop-shadow(2px 2px 1px rgba(255, 255, 255, 0.4))" : "drop-shadow(0 0 4px rgba(0, 0, 0, 1))"
        // e.style.textShadow = "0 0 1px black"
        e.textContent = content
        e.style.whiteSpace = "pre"
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
      content = "0" // " ☾" // "⍿" // "⏀" // "︲" // "•" // "⏀" // "◦" // "·" // "⍿"
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
      content = n.toString() // .padStart(2, "0") // " ")
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
