/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #medium #template-literal
  
  ### Question
  
  Implement `ReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`
  
  For example
  
  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
  ```
  
  > View on GitHub: https://tsch.js.org/119
*/

/* _____________ Your Code Here _____________ */

// your answers

// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string
// > = From extends ''
//   ? S
//   : S extends `${infer L}${From}${infer R}`
//   ? ReplaceAll<`${L}${To}${R}`, From, To>
//   : S

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S

type a = ReplaceAll < 'foo', 'o', 'o' >
    
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/119/answer
  > View solutions: https://tsch.js.org/119/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * 第一次写没有把 ${L}${To} 分出来，会从上一次的结果再次进行替换
 * 如： ReplaceAll<'foo', 'o', 'o'> 类型实例化过深，且可能无限
 */