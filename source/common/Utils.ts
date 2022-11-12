import { ObservableObject, Ref } from "reactronic"

export type Composition<T> = {
  [K in keyof T]: T[K] | Ref<T[K]>
}

export function refs<O extends object = object>(owner: O): { readonly [P in keyof O]-?: Ref<O[P]> } {
  return Ref.to(owner)
}

export function compose<T extends Object>(init: Composition<T>): T {
  return new ObservableComposition(init) as unknown as T
}

class ObservableComposition<T> extends ObservableObject {
  constructor(composition: Composition<T>) {
    super()
    convertValuesToFieldsButRefsToGetSet(this, composition)
  }
}

function convertValuesToFieldsButRefsToGetSet<T>(target: Object, composition: Composition<T>): void {
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
