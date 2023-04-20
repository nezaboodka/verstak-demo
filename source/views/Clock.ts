import { Band, Align, Svg, Circle, Rect, Text, TextPath, G, Block } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { $app } from "models/App"

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
                e.style.stroke = "black"
                e.style.fill = "silver"
                e.style.strokeWidth = "4px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 490
                e.style.stroke = "black"
                e.style.fill = "silver"
                e.style.strokeWidth = "3px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 400
                e.style.stroke = "silver"
                e.style.fill = "#1a3043"
                e.style.strokeWidth = "10px"
              },
            })
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 207
                e.r.baseVal.value = 45
                e.style.stroke = "rgba(0, 0, 0, 0.25)"
                e.style.fill = "#93CAEC"
                e.style.strokeWidth = "2px"
              },
            })

            radialDots("#AAAAAA", 15, 30, 270)
            radialDots("#AAAAAA", 6, 0, 105)
            //dots("magenta", 15, 30, 0)

            // Hours & Minutes
            radialLabels(svg, 290, 100, "bold", "white", false,
              [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22], 15, 180)
            // radialLabels(svg, 250, 35, "normal", "#CCCCCC", false,
            //   [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23], 15, 180)
            radialLabels(svg, 370, 40, "normal", "#CCCCCC", true,
              [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], 6, 0)

            // Arrows
            Arrow(30, 0.425, 5, 60, 60 * 60 * 24, "white", "black")
            Arrow(10, 0.7, 5, 45, 60 * 60, "white", "black")
            Arrow(8, 0.75, 0, 0, 60, "black", "white")
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
            // CircleLabels([2, 4, 6, 8, 10, 14, 16, 18, 20, 22], 60, "normal", "black", svg)

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
                radialDots("#555555", 15, 90, 87)
                // dots(svg, -98)
                radialLabels(svg, 445, 50, "normal", "#111111", true,
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 15, 180)
                Circle({
                  render(b) {
                    const e = b.native
                    e.cx.baseVal.value = 500
                    e.cy.baseVal.value = 55
                    e.r.baseVal.value = 30
                    e.style.stroke = "#FFFFB7"
                    e.style.fill = "#93CAEC"
                    e.style.strokeWidth = "1px"
                  },
                })
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

function radialDots(color: string, step: number, major: number, indent: number): void {
  for (let deg = 0; deg < 360; deg += step) {
    // if (major === 0 || (deg !== 0 && deg !== 180)) {
      Rect({
        render(b) {
          const w = major !== 0 && deg % major === 0 ? 15 : 5
          const h = major !== 0 && deg % major === 0 ? w : w * (indent === 0 ? 100 : 3)
          const e = b.native
          e.x.baseVal.value = 500 - w / 2
          e.y.baseVal.value = indent >= 0 ? indent : Math.abs(indent) - h
          e.rx.baseVal.value = w === h ? w : 0
          e.ry.baseVal.value = h === w ? h : 0
          e.width.baseVal.value = w
          e.height.baseVal.value = h
          e.style.stroke = color
          e.style.fill = color
          e.style.strokeWidth = "0"
          rotate(e, indent === 0 ? deg + 15 : deg)
        },
      })
    // }
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
        e.style.transformOrigin = "500px 500px"
        e.style.transform = `rotate(${degrees}deg)`
        e.style.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function DialLabel(x: number, y: number, content: string, size: number,
  color: string, degrees: number, root: SVGSVGElement): Block<SVGTextElement> {
  return (
    Text({
      render(b) {
        const e = b.native
        b.native.textContent = content
        const xx = root.createSVGLength()
        xx.value = x
        const yy = root.createSVGLength()
        yy.value = y
        e.x.baseVal.initialize(xx)
        e.y.baseVal.initialize(yy)
        e.style.fill = color
        e.style.fontSize = `${size}px`
        e.style.textAnchor = "middle"
        e.style.alignmentBaseline = "central"
        e.style.transformOrigin = `${x}px ${y}px`
        e.style.transform = `rotate(${degrees}deg)`
      }
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
        e.style.lineHeight = "0.8"
        e.style.textAnchor = "middle"
        e.style.alignmentBaseline = "central"
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
  radius: number, size: number, weight: string, color: string,
  bezel: boolean, numbers: Array<number>, step: number, basis: number): void {
  for (const n of numbers) {
    let content: string
    if (basis === 180 && n === 0) {
      content = "⍿"
    }
    else if (basis === 180 && n === 12) {
      content = "☀"
    }
    else {
      content = n.toString().padStart(2, "0")
      if (basis === 0)
        content = content[0] + " " + content[1]
    }
    RadialLabel(n * step + basis, content,
      content !== "☀" ? color : "#FFFFB7",
      radius, size,
      n % 12 !== 0 ? weight : "normal", bezel, root)
  }
}
