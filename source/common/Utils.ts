import { ObservableObject, Ref } from "reactronic"

export type ValuesOrRefs<T> = {
  [K in keyof T]: T[K] | Ref<T[K]>
}

export function composeModel<T extends Object>(modelProps: ValuesOrRefs<T>): T {
  return new ObservableComposition(modelProps) as unknown as T
}

class ObservableComposition<T> extends ObservableObject {
  constructor(composition: ValuesOrRefs<T>) {
    super()
    convertValuesToFieldsAndRefsToGetSet(this, composition)
  }
}

function convertValuesToFieldsAndRefsToGetSet<T>(target: Object, composition: ValuesOrRefs<T>): void {
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
