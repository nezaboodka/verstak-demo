import { ObservableObject, raw, reactive } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"
import { Loader } from "./Loader"

export class App extends ObservableObject {
  version: string
  theme: Theme
  blinkingEffect: boolean
  loader: Loader

  constructor(version: string, theme: Theme) {
    super()
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
  protected applyBlinkingEffect(): void {
    BaseHtmlDriver.blinkingEffect = this.blinkingEffect ? "verstak-blinking-effect" : undefined
  }
}
