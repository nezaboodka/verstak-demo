import { ObservableObject, raw, reactive } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"

export class App extends ObservableObject {
  @raw readonly version: string
  @raw readonly sensors: HtmlSensors
  blinkingEffect: boolean

  constructor(version: string) {
    super()
    this.version = version
    this.sensors = new HtmlSensors()
    this.blinkingEffect = false
  }

  @reactive
  protected actualizeBrowserTitle(): void {
    document.title = `Verstak Demo ${this.version}`
  }

  @reactive
  applyBlinkingEffect(): void {
    BaseHtmlDriver.blinkingEffect = this.blinkingEffect ? "blink" : undefined
  }
}
