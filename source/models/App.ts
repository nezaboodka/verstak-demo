import { ObservableObject, reactive, transactional, ReactiveNodeVariable } from "reactronic"
import { WebDriver } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { Loader } from "./Loader.js"

export class App extends ObservableObject {
  static readonly blinkingEffectMarker = "ё"
  private static readonly gCurrent = new ReactiveNodeVariable<App>()

  version: string
  allThemes: Array<AppTheme>
  activeThemeIndex: number
  isBlinkingEffectOn: boolean
  isSecondaryTimeZoneOn: boolean
  isSplitViewOn: boolean
  position: number
  loader: Loader

  constructor(version: string, ...themes: Array<AppTheme>) {
    super()
    this.version = version
    this.allThemes = themes
    this.activeThemeIndex = 0
    this.isBlinkingEffectOn = false
    this.isSecondaryTimeZoneOn = true
    this.isSplitViewOn = true
    this.position = Infinity
    this.loader = new Loader()
  }

  static get current(): App {
    return App.gCurrent.value
  }
  static set current(value: App) {
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
    WebDriver.blinkingEffectMarker = this.isBlinkingEffectOn ? App.blinkingEffectMarker : undefined
  }
}
