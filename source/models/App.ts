import { ObservableObject, raw, reactive } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"

export class App extends ObservableObject {
  @raw readonly version: string
  @raw readonly sensors: HtmlSensors
  theme: Theme
  blinkingEffect: boolean

  constructor(version: string, theme: Theme) {
    super()
    this.version = version
    this.sensors = new HtmlSensors()
    this.theme = theme
    this.blinkingEffect = false
  }

  @reactive
  protected actualizeBrowserTitle(): void {
    document.title = `Verstak Demo ${this.version}`
  }

  @reactive
  applyBlinkingEffect(): void {
    BaseHtmlDriver.blinkingEffect = this.blinkingEffect ? "verstak-blinking-effect" : undefined
  }
}
