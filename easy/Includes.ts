/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array
  
  ### Question
  
  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.
  
  For example
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
  
  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U> = U extends  T[number] ? true : false;

type Includes<T extends readonly any[], U> = T extends [infer X, ...infer Y]
  ? Equal<X, U> extends true
    ? true
    : Includes<Y, U>
  : false

type myEqual<T, U> = T extends U ? true : false

type a = Includes<[{}], { a: 'A' }>

type a2 = { a: 'A' } extends {} ? true : false

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * 我第一版写的 type Includes<T extends readonly any[], U> = U extends  T[number] ? true : false;
 * 问题在与无法判断： false 和 boolean等包含关系。 false extends boolean 是 true。这里需要 false
 *
 * 第二版加入了 递归
 *
 * 其中未理解的问题为: 如何自己来实现 Equal
 */
