/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #math #template-literal
  
  ### Question
  
  Implement the `Absolute` type. A type that take string, number or bigint. The output should be a positive number string
  
  For example
  
  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```
  
  > View on GitHub: https://tsch.js.org/529
*/

/* _____________ Your Code Here _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? `${R}`
  : `${T}`

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/529/answer
  > View solutions: https://tsch.js.org/529/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * 核心解法是，是将 T 转换为字符串，然后检查字符串前面是否有 -。 如果有，则返回 - 之后的字符串，否则返回已转换为字符串的 T。
 * 把数值转换成字符串，`${}` 放入模版字符串中即可
 */
