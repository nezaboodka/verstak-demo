import { ObservableObject, raw, transactional } from "reactronic"

export class Clock extends ObservableObject {
  @raw interval: number
  @raw fractional: number
  ms: number
  second: number
  minute: number
  hour: number
  day: number
  month: number
  year: number

  constructor(interval: number = 1000, fractional: number = 0) {
    super()
    const now = new Date()
    this.interval = interval
    this.fractional = fractional
    this.year = now.getUTCFullYear()
    this.month = now.getUTCMonth()
    this.day = now.getUTCDate()
    this.hour = now.getUTCHours()
    this.minute = now.getUTCMinutes()
    this.second = now.getUTCSeconds()
    this.ms = now.getUTCMilliseconds()
    setTimeout(this.tick, this.interval)
  }

  @transactional
  private tick(): void {
    let inaccuracy = 0
    try {
      const now = new Date()
      this.ms = now.getUTCMilliseconds()
      this.second = now.getUTCSeconds()
      this.minute = now.getUTCMinutes()
      this.hour = now.getUTCHours()
      this.day = now.getUTCDate()
      this.month = now.getUTCMonth()
      this.year = now.getUTCFullYear()
      inaccuracy = now.getTime() % this.interval
    }
    finally {
      setTimeout(this.tick, this.interval - inaccuracy)
    }
  }
}
