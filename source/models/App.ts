import { ObservableObject, raw, reactive } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"
import { Loader } from "./Loader"

export class App extends ObservableObject {
  @raw readonly sensors: HtmlSensors
  version: string
  theme: Theme
  blinkingEffect: boolean
  loader: Loader

  constructor(version: string, theme: Theme) {
    super()
    this.sensors = new HtmlSensors()
    this.version = version
    this.theme = theme
    this.blinkingEffect = false
    this.loader = new Loader()
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
