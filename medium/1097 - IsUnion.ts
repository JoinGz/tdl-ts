/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium 
  
  ### Question
  
  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.
  
  For example:
    
    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```
  
  > View on GitHub: https://tsch.js.org/1097
*/


/* _____________ Your Code Here _____________ */

type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : 6

/**
 * 解题思路
 * 主要还是利用 联合类型的分配特性
 * 主要的是 [U] extends [T]
 * 因为 U = T , [T] extends [U] 在任何情况下都成立的，
 * 如： IsUnion<'a' | 'b'>, 进入 T extends U 后 T 为 'a'
 *  ['a'] extends ['a' | 'b'] 就为 true 了
 * 如果交换 [U] extends [T] 不是分配类型的不受影响依然为true
 * 但是分配类型就为false了。（['a' | 'b'] extends ['a']）。所以就能区分哪些情况是union了。
 * 但是 [U] extends [T] 在分配的时候确不成立
 */

// type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false;

/**
 * string -> string extends string ? [string] extends [string] ? false : true : false
 * a | b -> a extends a | b ? [a] extends [a | b] ? true : false : false 
 * 
 */

type lmk = IsUnion<string>
type lmk2 = IsUnion<'a'|'b'|'c'|'d'>

type n = string extends string | 'a' ? 1 : 2


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false >>,
  Expect<Equal<IsUnion<string|number>, true >>,
  Expect<Equal<IsUnion<'a'|'b'|'c'|'d'>, true >>,
  Expect<Equal<IsUnion<undefined|null|void|''>, true >>,
  Expect<Equal<IsUnion<{ a: string }|{ a: number }>, true >>,
  Expect<Equal<IsUnion<{ a: string|number }>, false >>,
  Expect<Equal<IsUnion<[string|number]>, false >>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string|never>, false >>,
  Expect<Equal<IsUnion<string|unknown>, false >>,
  Expect<Equal<IsUnion<string|any>, false >>,
  Expect<Equal<IsUnion<string|'a'>, false >>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/

