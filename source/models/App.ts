import { ObservableObject, reactive, transactional } from "reactronic"
import { BaseHtmlDriver, SubTreeVariable, HtmlSensors } from "verstak"
import { AppTheme } from "themes/AppTheme"
import { Loader } from "./Loader"

export class App extends ObservableObject {
  static readonly blinkingEffectMarker = "ё"
  private static readonly gCurrent = new SubTreeVariable<App>()

  version: string
  sensors: HtmlSensors
  allThemes: Array<AppTheme>
  activeThemeIndex: number
  isBlinkingEffectOn: boolean
  isSecondaryTimeZoneOn: boolean
  loader: Loader

  constructor(version: string, ...themes: Array<AppTheme>) {
    super()
    this.version = version
    this.sensors = new HtmlSensors()
    this.allThemes = themes
    this.activeThemeIndex = 0
    this.isBlinkingEffectOn = false
    this.isSecondaryTimeZoneOn = true
    this.loader = new Loader()
  }

  static get actual(): App {
    return App.gCurrent.value
  }
  static set actual(value: App) {
    App.gCurrent.value = value
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
    BaseHtmlDriver.blinkingEffectMarker = this.isBlinkingEffectOn ? App.blinkingEffectMarker : undefined
  }
}
