/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array
  
  ### Question
  
  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.
  
  For example:
  
  ```ts
  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
  ```
  
  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */

type FalsyVal = [] | Record<string, never> | '' | 0 | false


type AnyOf<T extends readonly any[]> = 
   T extends [infer R, ...infer Y]
  ? R extends FalsyVal
    ? AnyOf<Y>
  : true
: false



// 之前的问题：顺序的问题，跳过[], 有一个是false及为false。

// 查看答案后
// 理解题目有问题，正确的是： 其实题目是有一个true则为true
// 所以导致了逻辑的不同。
// 那么，当是false的时候继续递归直到是true
// []的处理，其实[]不满足约束[infer R, ...infer Y]。所以已经处理了


// 知识点
type bool = '' extends {} ? true : false // true
type bool2 = 0 extends {} ? true : false // true
type bool3 = true extends {} ? true : false // true
type bool4 = null extends {} ? true : false // false
type bool5 = undefined extends {} ? true : false // false
type bool6 = null extends unknown ? true : false // true

// 由上面的知识点得知不能直接写一个 {}， 改为 Record<string, never>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', []]>, false>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', [], {}, false]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
