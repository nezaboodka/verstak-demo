import { ObservableObject } from "reactronic"

export function oo<T extends Object>(init: T): T {
  return new OO(init) as unknown as T
}

class OO extends ObservableObject {
  constructor(init: object) {
    super()
    Object.assign(this, init)
  }
}
