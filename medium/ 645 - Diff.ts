/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
  
  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<O, O1> = {
  [P in keyof O | keyof O1]: P extends keyof O
    ? P extends keyof O1
      ? never
      : O[P]
    : P extends keyof O1
    ? O1[P]
    : never
}

type TT<K1, K2> = K1 extends K2 ? K2 extends K1 ? never : K1 : K2 extends K1 ? never : K1
type Diff2<O extends Record<string, any>, O1 extends Record<string, any>> = {
  [k in TT<keyof (O & O1), keyof (O | O1)>]: k extends keyof O ? O[k] : k extends keyof O1 ? O1[k] : never
}

// 如何删除值为never的属性

type select<T> = [T] extends [never] ? never : T
type pick<o> = { [p in select<keyof o>]: p extends keyof o ? o[p] : never }

type exp1<T, U extends keyof T> = T[U] extends never ? never : U

type exp2 = exp1<{name: string, age: never}, "age" | "name">

type exp3<T> = { [P in keyof T]: T[P] extends never ? never : P }[keyof T]

type exp4 = exp3<{name: 'string', kill: never, l: number}>

type u = pick<{name: string, age: never}>
type m = select<string | never>
type ooo = Diff<Foo, Coo>
type ooo1 = keyof ( Foo & Coo)
type ooo2 = keyof ( Foo | Coo)

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

// your answers


type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
