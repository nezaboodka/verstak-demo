import { ObservableObject, transactional } from "reactronic"

export class Clock extends ObservableObject {
  hour: number = 0
  minute: number = 0
  second: number = 0
  ms: number = 0
  interval: number = 0
  paused: boolean = false

  constructor(interval: number = 1000) {
    super()
    this.interval = interval
    this.tick()
  }

  @transactional
  pause(value: boolean = true): void {
    this.paused = value
  }

  @transactional
  private tick(): void {
    let calibration = 0
    try {
      const now = new Date()
      this.ms = now.getMilliseconds()
      this.second = now.getSeconds()
      this.minute = now.getMinutes()
      this.hour = now.getHours()
      calibration = now.getTime() % this.interval
    }
    finally {
      setTimeout(() => this.tick(), this.interval - calibration)
    }
  }
}
