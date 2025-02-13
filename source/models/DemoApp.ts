import { ObservableObject, atomicAction, reactiveProcess, ReactiveNodeVariable } from "reactronic"
import { WebDriver } from "verstak"
import { AppTheme } from "themes/AppTheme.js"
import { Loader } from "./Loader.js"

export class DemoApp extends ObservableObject {
  static readonly blinkingEffectMarker = "ё"
  private static readonly gCurrent = new ReactiveNodeVariable<DemoApp>()

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

  static get current(): DemoApp {
    return DemoApp.gCurrent.value
  }
  static set current(value: DemoApp) {
    DemoApp.gCurrent.value = value
  }

  get theme(): AppTheme {
    return this.allThemes[this.activeThemeIndex]
  }

  @atomicAction
  nextTheme(): void {
    this.activeThemeIndex = (this.activeThemeIndex + 1) % this.allThemes.length
  }

  @reactiveProcess
  protected actualizeBrowserTitle(): void {
    document.title = `Verstak Demo ${this.version}`
  }

  @reactiveProcess
  protected actualizeBlinkingEffect(): void {
    WebDriver.blinkingEffectMarker = this.isBlinkingEffectOn ? DemoApp.blinkingEffectMarker : undefined
  }
}
