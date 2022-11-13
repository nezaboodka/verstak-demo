import { ObservableObject, Ref } from "reactronic"

export type Composition<T> = {
  [K in keyof T]: T[K] | Ref<T[K]>
}

export function compose<T extends Object>(init: Composition<T>): T {
  return new ObservableComposition(init) as unknown as T
}

class ObservableComposition<T> extends ObservableObject {
  constructor(composition: Composition<T>) {
    super()
    convertValuesToFieldsAndRefsToGetSet(this, composition)
  }
}

function convertValuesToFieldsAndRefsToGetSet<T>(target: Object, composition: Composition<T>): void {
  for (const key in composition) {
    const x = composition[key]
    if (x instanceof Ref) {
      Object.defineProperty(target, key, {
        get() { return x.variable },
        set(v: any) { x.variable = v; return true },
        enumerable: true,
        // configurable: false,
      })
    }
    else
      target[key as any] = x
  }
}
