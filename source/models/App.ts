import { ObservableObject, reactive, transactional } from "reactronic"
import { BaseHtmlDriver, ContextVariable, HtmlSensors } from "verstak"
import { AppTheme } from "themes/AppTheme"
import { Loader } from "./Loader"

export class App extends ObservableObject {
  static readonly blinkingEffectMarker = "ё"

  version: string
  sensors: HtmlSensors
  allThemes: Array<AppTheme>
  activeThemeIndex: number
  blinkingEffect: boolean
  secondaryTimeZone: boolean
  loader: Loader

  constructor(version: string, ...themes: Array<AppTheme>) {
    super()
    this.version = version
    this.sensors = new HtmlSensors()
    this.allThemes = themes
    this.activeThemeIndex = 0
    this.blinkingEffect = false
    this.secondaryTimeZone = true
    this.loader = new Loader()
  }

  get theme(): AppTheme {
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
    BaseHtmlDriver.blinkingEffectMarker = this.blinkingEffect ? App.blinkingEffectMarker : undefined
  }
}

export const $app = new ContextVariable<App>()
