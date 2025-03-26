import { TriggeringObject, pause, reactive, Indicator, ReactiveSystem } from "reactronic"

export class Loader extends TriggeringObject {
  filter: string
  loaded: Array<string>
  indicator: Indicator

  constructor() {
    super()
    this.filter = ""
    this.loaded = []
    this.indicator = Indicator.create("Loader.indicator", -1, -1, 1)
    ReactiveSystem.getOperation(this.load).configure({ indicator: this.indicator })
  }

  @reactive
  protected async load(): Promise<void> {
    await pause(100)
    const f = this.filter.toLocaleLowerCase()
    this.loaded = technologies.filter(x => x.toLocaleLowerCase().indexOf(f) >= 0)
  }
}

const technologies = [
  "Nezaboodka",
  "Boocel",
  "Reactronic",
  "Artel",
  "Verstak",
  "And some more products in the future"
]
