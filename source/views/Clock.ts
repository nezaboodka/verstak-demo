import { Band, Note, Align, Svg, Circle } from "verstak"
import { $theme } from "gost-pi"
import { AppTheme } from "themes/AppTheme"

export function Clock(area: string) {
  return (
    Band({
      initialize(b) {
        b.contentAlignment = Align.Center
      },
      render(b) {
        const theme = $theme.value as AppTheme
        b.area = area
        b.style(theme.accent)
        Svg({
          render(b) {
            Circle({
              render(b) {
              }
            })
          },
        })
      }
    })
  )
}
