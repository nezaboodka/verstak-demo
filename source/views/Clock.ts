import { Band, Align, Svg, Circle, Rect, Text, TextPath, G, Block } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"
import { $app } from "models/App"

export function Clock(area: string): Block<HTMLElement> {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
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
                e.style.stroke = "black"
                e.style.fill = "gray"
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
                e.style.fill = "gray"
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
                e.style.fill = "white"
                e.style.strokeWidth = "10px"
              },
            })
            // Circle({
            //   render(b) {
            //     const e = b.native
            //     e.cx.baseVal.value = 500
            //     e.cy.baseVal.value = 500
            //     e.r.baseVal.value = 150
            //     e.style.stroke = "#707070"
            //     e.style.fill = "#E0E0E0"
            //     e.style.strokeWidth = "2px"
            //   },
            // })

            dots(svg, 250)
            // Hours
            DialLabel(500, 170, "☼", 100, "black", svg)
            DialLabel(500, 230, "12", 50, "black", svg)
            DialLabel(500, 865, "•", 100, "black", svg)
            DialLabel(345, 815, "02", 100, "black", svg)
            DialLabel(220, 700, "04", 100, "black", svg)
            DialLabel(175, 535, "06", 100, "black", svg)
            DialLabel(220, 375, "08", 100, "black", svg)
            DialLabel(340, 255, "10", 100, "black", svg)
            DialLabel(660, 250, "14", 100, "black", svg)
            DialLabel(785, 380, "16", 100, "black", svg)
            DialLabel(825, 535, "18", 100, "black", svg)
            DialLabel(780, 700, "20", 100, "black", svg)
            DialLabel(655, 815, "22", 100, "black", svg)

            // Minutes
            DialLabel(500, 335, "00", 50, "red", svg)
            DialLabel(590, 365, "05", 50, "red", svg)
            DialLabel(655, 430, "10", 50, "red", svg)
            DialLabel(685, 518, "15", 50, "red", svg)
            DialLabel(655, 610, "20", 50, "red", svg)
            DialLabel(590, 677, "25", 50, "red", svg)
            DialLabel(500, 705, "30", 50, "red", svg)
            DialLabel(412, 677, "35", 50, "red", svg)
            DialLabel(345, 612, "40", 50, "red", svg)
            DialLabel(320, 518, "45", 50, "red", svg)
            DialLabel(350, 430, "50", 50, "red", svg)
            DialLabel(412, 362, "55", 50, "red", svg)

            // Arrows
            Arrow(30, 0.4, 5, 15, 60 * 60 * 24, "black")
            Arrow(10, 0.3, 5, 15, 60 * 60, "red")
            Arrow(5, 0.3, 0, 0, 60, "red")
            Circle({
              render(b) {
                const e = b.native
                e.cx.baseVal.value = 500
                e.cy.baseVal.value = 500
                e.r.baseVal.value = 15
                e.style.stroke = "black"
                e.style.fill = "black"
                e.style.strokeWidth = "10px"
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
                // dots(svg, -98)
                Circle({
                  render(b) {
                    const e = b.native
                    e.cx.baseVal.value = 500
                    e.cy.baseVal.value = 50
                    e.r.baseVal.value = 36
                    e.style.stroke = "#111111"
                    e.style.fill = "#DDDDDD"
                    e.style.strokeWidth = "1px"
                  },
                })
                Text({
                  render(b) {
                    const e = b.native
                    e.textContent = "Пояс Б"
                    const x = svg.createSVGLength()
                    x.value = 500
                    const y = svg.createSVGLength()
                    y.value = 970
                    e.x.baseVal.initialize(x)
                    e.y.baseVal.initialize(y)
                    e.style.fontSize = "60px"
                    //e.style.fontWeight = "bold"
                    e.style.textAnchor = "middle"
                    // e.style.stroke = "#CCCCCC"
                    // e.style.fill = "#CCCCCC"
                  }
                })
                Text({
                  render(b) {
                    const e = b.native
                    b.native.textContent = "12"
                    const x = svg.createSVGLength()
                    x.value = 500
                    const y = svg.createSVGLength()
                    y.value = 70
                    e.x.baseVal.initialize(x)
                    e.y.baseVal.initialize(y)
                    e.style.fontSize = "60px"
                    //e.style.fontWeight = "bold"
                    e.style.textAnchor = "middle"
                  }
                })
                // BezelLabels([3, 6, 9, 15, 18, 21], 70, "bold", svg)
                // BezelLabels([1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23], 50, "normal", svg)
                BezelLabels([2, 4, 6, 8, 10, 14, 16, 18, 20, 22], 60, "normal", svg)
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

function dots(root: SVGSVGElement, base: number): void {
  for (let deg = 0; deg < 360; deg += 15) {
    Rect({
      render(b) {
        const w = deg % 30 === 0 ? 10 : 5
        const h = deg % 30 === 0 && base < 0 ? w * 2 : w * 3
        const e = b.native
        e.x.baseVal.value = 500 - w / 2
        e.y.baseVal.value = base >= 0 ? base : Math.abs(base) - h
        e.width.baseVal.value = w
        e.height.baseVal.value = h
        e.style.stroke = "black"
        e.style.fill = "black"
        e.style.strokeWidth = "0"
        rotate(e, deg)
      },
    })
  }
}

function Arrow(width: number, length: number, rounding: number,
  degrees: number, duration: number, color: string): Block<SVGRectElement> {
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
        e.style.stroke = "white"
        e.style.fill = color
        e.style.strokeWidth = "2px"
        e.style.transformOrigin = "500px 500px"
        e.style.transform = `rotate(${degrees}deg)`
        e.style.animation = `transform-rotate ${duration}s linear infinite`
      },
    })
  )
}

function DialLabel(x: number, y: number, content: string, size: number,
  color: string, root: SVGSVGElement): Block<SVGTextElement> {
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
        // e.style.fontWeight = "bold"
        e.style.textAnchor = "middle"
      }
    })
  )
}

function BezelLabels(hours: Array<number>, size: number, weight: string, root: SVGSVGElement): void {
  for (const h of hours) {
    Text({
      render(b) {
        const e = b.native
        b.native.textContent = h.toString()
        const x = root.createSVGLength()
        x.value = 500
        const y = root.createSVGLength()
        y.value = size + 14
        e.x.baseVal.initialize(x)
        e.y.baseVal.initialize(y)
        e.style.fontSize = `${size}px`
        e.style.fontWeight = weight
        e.style.lineHeight = "1"
        e.style.textAnchor = "middle"
        rotate(e, h * 15 + 180)
      },
    })
  }
}
