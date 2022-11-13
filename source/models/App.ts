import { ObservableObject, raw, reactive } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"

export class App extends ObservableObject {
  @raw readonly sensors: HtmlSensors
  version: string
  theme: Theme
  blinkingEffect: boolean

  constructor(version: string, theme: Theme) {
    super()
    this.sensors = new HtmlSensors()
    this.version = version
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
