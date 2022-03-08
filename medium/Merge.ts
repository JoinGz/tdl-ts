/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Merge two types into a new type. Keys of the second type overrides keys of the first type.
  
  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

// 第一版，少了一步
// 提示的错误： 类型“FK”无法用于索引类型“S”
// 应该是FK同时在两个对象上取值，没有约束到S上面，再次约束一下即可
type Merge<F extends {}, S extends {}> = {
  [FK in (keyof F | keyof S)] : FK extends keyof F ? F[FK] : S[FK]
};

// type Merge<F extends {}, S extends {}> = {
//   [K in keyof F | keyof S]: K extends keyof S
//     ? S[K]
//     : K extends keyof F
//     ? F[K]
//   : never
// }






/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
