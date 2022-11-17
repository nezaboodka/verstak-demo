import { ObservableObject, raw, reactive, transactional } from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"
import { Loader } from "./Loader"

export class App extends ObservableObject {
  version: string
  allThemes: Array<Theme>
  activeThemeIndex: number
  blinkingEffect: boolean
  loader: Loader

  constructor(version: string, ...themes: Array<Theme>) {
    super()
    this.version = version
    this.allThemes = themes
    this.activeThemeIndex = 0
    this.blinkingEffect = false
    this.loader = new Loader()
  }

  get theme(): Theme {
    return this.allThemes[this.activeThemeIndex]
  }

  @transactional
  nextTheme(): void {
    this.activeThemeIndex = (this.activeThemeIndex + 1) % this.allThemes.length
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
