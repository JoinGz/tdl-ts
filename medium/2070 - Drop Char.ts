/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer
  
  ### Question
  
  Drop a specified char from a string.
  
  For example:
  
  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```
  
  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

type DropChar_my_answer<S, C extends string> = S extends `${infer R}${C}`
  ? DropChar_my_answer<R, C>
  : S extends `${C}${infer R}`
  ? DropChar_my_answer<R, C>
  : S extends `${C}${infer R}${infer Y}`
  ? DropChar_my_answer<`${R}${Y}`, C>
  : S extends `${infer R}${C}${infer Y}`
  ? DropChar_my_answer<`${R}${Y}`, C>
  : S

  type DropChar<S, C extends string> = S extends `${infer R}${C}${infer Y}` ? DropChar<`${R}${Y}`, C> : S

  /**
   * 解题过程
   * 我把所有的情况都描述出来了
   * 如情况在右边，中间，左边等情况
   * 查看答案，发现不用，ts能正常匹配这些情况如 answer_test
   * 
   * 
   */

  type answer_test<T extends string> = T extends `${infer R}${T}${infer Y}` ? 1 : 2
  type example = answer_test<'4'> // 1

type kk = DropChar<'butter fly!', ' '>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2070/answer
  > View solutions: https://tsch.js.org/2070/solutions
  > More Challenges: https://tsch.js.org
*/
