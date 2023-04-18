import { Band, Align, Svg, Circle, Rect, Text, TextPath, G, Block } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function Clock(area: string): Block<HTMLElement> {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
        b.native.style.fontFamily = "tektur"
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

            dots(svg, 250)
            HourLabel(500, 200, "☼", 100, svg)
            HourLabel(510, 865, "☾", 100, svg)
            // HourLabel(550, 850, "*", 75, svg)
            HourLabel(345, 815, "02", 100, svg)
            HourLabel(220, 700, "04", 100, svg)
            HourLabel(175, 535, "06", 100, svg)
            HourLabel(220, 375, "08", 100, svg)
            HourLabel(340, 255, "10", 100, svg)
            HourLabel(660, 250, "14", 100, svg)
            HourLabel(785, 380, "16", 100, svg)
            HourLabel(825, 535, "18", 100, svg)
            HourLabel(780, 700, "20", 100, svg)
            HourLabel(655, 815, "22", 100, svg)
            Arrow(30, 0.4, 5, 75, svg)
            Arrow(10, 0.65, 5, 20, svg)
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
              render(b) {
                rotate(b.native, 105, svg)
                dots(svg, -98)
                Circle({
                  render(b) {
                    const e = b.native
                    e.cx.baseVal.value = 500
                    e.cy.baseVal.value = 54
                    e.r.baseVal.value = 40
                    e.style.stroke = "#111111"
                    e.style.fill = "#DDDDDD"
                    e.style.strokeWidth = "1px"
                  },
                })
                Circle({
                  render(b) {
                    const e = b.native
                    e.cx.baseVal.value = 500
                    e.cy.baseVal.value = 946
                    e.r.baseVal.value = 40
                    e.style.stroke = "#111111"
                    e.style.fill = "#555555"
                    e.style.strokeWidth = "1px"
                  },
                })
                Text({
                  render(b) {
                    const e = b.native
                    b.native.textContent = "0"
                    const x = svg.createSVGLength()
                    x.value = 500
                    const y = svg.createSVGLength()
                    y.value = 970
                    e.x.baseVal.appendItem(x)
                    e.y.baseVal.appendItem(y)
                    e.style.fontSize = "60px"
                    e.style.fontWeight = "bold"
                    e.style.textAnchor = "middle"
                    // e.style.stroke = "#CCCCCC"
                    e.style.fill = "#CCCCCC"
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
                    e.x.baseVal.appendItem(x)
                    e.y.baseVal.appendItem(y)
                    e.style.fontSize = "60px"
                    e.style.fontWeight = "bold"
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

function rotate(e: SVGGraphicsElement, degrees: number, root: SVGSVGElement): void {
  const t = root.createSVGTransform()
  t.setRotate(degrees, 500, 500)
  e.transform.baseVal.appendItem(t)
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
        rotate(e, deg, root)
      },
    })
  }
}

function Arrow(width: number, length: number, rounding: number,
  degrees: number, root: SVGSVGElement): Block<SVGRectElement> {
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
        e.style.fill = "black"
        e.style.strokeWidth = "2px"
        rotate(e, degrees, root)
      },
    })
  )
}

function HourLabel(x: number, y: number, content: string, size: number,
  root: SVGSVGElement): Block<SVGTextElement> {
  return (
    Text({
      render(b) {
        const e = b.native
        b.native.textContent = content
        const xx = root.createSVGLength()
        xx.value = x
        const yy = root.createSVGLength()
        yy.value = y
        e.x.baseVal.appendItem(xx)
        e.y.baseVal.appendItem(yy)
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
        y.value = size + 10
        e.x.baseVal.appendItem(x)
        e.y.baseVal.appendItem(y)
        e.style.fontSize = `${size}px`
        e.style.fontWeight = weight
        e.style.lineHeight = "1"
        e.style.textAnchor = "middle"
        rotate(e, h * 15 + 180, root)
      },
    })
  }
}
