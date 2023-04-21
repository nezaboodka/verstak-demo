import { Band, Align, Svg, Circle, Rect, Text, TextPath, G, Block } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { $app } from "models/App"

const AccentColor = "#93CAEC" // "#93CAEC" // "#87F7A5" // "#FFFFB7"

export function Clock(area: string): Block<HTMLElement> {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
        b.native.style.fontFamily = "arial"
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
                e.style.fill = "silver"
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
                e.style.fill = "silver"
                e.style.strokeWidth = "4px"
                e.style.filter = "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.4))"
                rotate(e, 32)
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 490
                e.style.stroke = "gray"
                e.style.fill = "silver"
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
                e.style.fill = "#1a3043"
                e.style.strokeWidth = "3px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 360
                e.style.stroke = AccentColor
                e.style.fill = "transparent"
                e.style.strokeWidth = "3px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 230
                e.style.stroke = "white"
                e.style.fill = "transparent"
                e.style.strokeWidth = "3px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 200
                e.style.stroke = "white"
                e.style.fill = "transparent"
                e.style.strokeWidth = "3px"
              },
            })

            radialDashes("#AAAAAA", 15, 0, 280)
            //radialDots(AccentColor, 30, 30, 130)
            radialDots(AccentColor, 6, 30, 120)
            radialDots("black", 60, 60, 120)
            // radialDots(AccentColor, 360, 180, 115)
            radialDashes("white", 45, 45, 270)
            //dots("magenta", 15, 30, 0)

            // Hours & Minutes
            radialLabels(svg, 295, 100, true, "white", false,
              [0, 6, 12, 18], 15, 180)
            radialLabels(svg, 295, 100, true, "white", false,
              [3, 9, 15, 21], 15, 180)
            radialLabels(svg, 265, 40, false, "#CCCCCC", false,
              [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23], 15, 180)
            radialLabels(svg, 378, 40, false, AccentColor, true,
              [0, 10, 20, 30, 40, 50], 6, 0)

            // Arrows
            Arrow(15, 0.420, 5, 60, 60 * 60 * 24, "white", "black")
            Arrow(30, 0.300, 5, 60, 60 * 60 * 24, "white", "white")
            Arrow(10, 0.755, 5, 47.5, 60 * 60, AccentColor, "black")
            Arrow(15, 0.380, 5, 47.5, 60 * 60, AccentColor, AccentColor)
            Arrow(7, 0.75, 0, 0, 60, "black", AccentColor)
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 15
                e.style.stroke = "black"
                e.style.fill = "white"
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
                radialDashes("#555555", 15, 0, 87)
                radialLabels(svg, 445, 70, false, "#222222", true,
                  [0, 12], 15, 180)
                radialLabels(svg, 445, 70, false, "#222222", true,
                  [3, 6, 9, 15, 18, 21], 15, 180)
                radialLabels(svg, 435, 40, false, "#222222", true,
                  [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23], 15, 180)
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

function radialDashes(color: string, step: number, major: number, indent: number): void {
  for (let deg = 0; deg < 360; deg += step) {
    Rect({
      render(b) {
        const w = major !== 0 && deg % major === 0 ? 15 : 5
        const h = major !== 0 && deg % major === 0 ? w * 2 : w * (indent === 0 ? 100 : 3)
        const e = b.native
        e.x.baseVal.value = 500 - w / 2
        e.y.baseVal.value = indent >= 0 ? indent : Math.abs(indent) - h
        e.width.baseVal.value = w
        e.height.baseVal.value = h
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
        const r = major !== 0 && deg % major === 0 ? 10 : 4
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

function Arrow(width: number, length: number, rounding: number,
  degrees: number, duration: number, color: string, stroke: string): Block<SVGRectElement> {
  return (
    Rect({
      render(b) {
        const e = b.native
        const l = Math.floor(500 * length)
        e.x.baseVal.value = 500 - width / 2
        e.y.baseVal.value = 500 - l
        e.width.baseVal.value = width
        e.height.baseVal.value = l
        e.rx.baseVal.value = rounding
        e.ry.baseVal.value = rounding
        e.style.stroke = stroke
        e.style.fill = color
        e.style.strokeWidth = "4px"
        e.style.filter = "drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.6))"
        e.style.transformOrigin = "500px 500px"
        e.style.transform = `rotate(${degrees}deg)`
        e.style.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function RadialLabel(degree: number, content: string, color: string,
  radius: number, size: number, weight: string, bezel: boolean,
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
        e.style.filter = "drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.4))"
        e.textContent = content
        if (bezel) {
          const xx = root.createSVGLength()
          xx.value = 500
          const yy = root.createSVGLength()
          yy.value = 500 - radius
          e.x.baseVal.initialize(xx)
          e.y.baseVal.initialize(yy)
          rotate(e, degree)
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
  bezel: boolean, numbers: Array<number>, step: number, basis: number): void {
  for (const n of numbers) {
    let content: string
    if (basis === 180 && n === 0) {
      content = "⏀" // "︲" // "•" // "⏀" // "◦" // "·" // "⍿"
    }
    // else if (basis === 180 && n === 12 && !bezel) {
    //   content = "•" // "☀"
    // }
    else {
      content = n.toString() // .padStart(2, "0")
      // if (basis === 0)
      //   content = content[0] + " " + content[1]
    }
    RadialLabel(n * step + basis, content,
      color, // content !== "☀" ? color : "#FFFFB7",
      radius, size,
      bold || (bezel && basis === 180 && n % 12 === 0) ? "bold" : "normal", // !bezel && n % 12 !== 0 ? weight : "normal",
      bezel, root)
  }
}
