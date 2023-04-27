import { LoggingLevel, ObservableObject, options, raw, transactional } from "reactronic"

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
    this.year = now.getFullYear()
    this.month = now.getMonth()
    this.day = now.getDate()
    this.hour = now.getHours()
    this.minute = now.getMinutes()
    this.second = now.getSeconds()
    this.ms = now.getMilliseconds()
    setTimeout(this.tick, this.interval)
  }

  @transactional
  private tick(): void {
    let inaccuracy = 0
    try {
      const now = new Date()
      this.ms = now.getMilliseconds()
      this.second = now.getSeconds()
      this.minute = now.getMinutes()
      this.hour = now.getHours()
      this.day = now.getDate()
      this.month = now.getMonth()
      this.year = now.getFullYear()
      inaccuracy = now.getTime() % this.interval
    }
    finally {
      setTimeout(this.tick, this.interval - inaccuracy)
    }
  }
}
