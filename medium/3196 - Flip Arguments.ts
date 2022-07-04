/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments
  
  ### Question
  
  Implement the type version of lodash's ```_.flip```.
  
  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.
  
  For example:
  
  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```
  
  > View on GitHub: https://tsch.js.org/3196
*/

/* _____________ Your Code Here _____________ */

// infer A 的结果是  [arg0: 1, arg1: 2]
/**
 * 当初的难点在于把A的结果展开给每一个参数
 * 看了答案后恍然大悟，我们还可以把参数收集起来然后再一起约束
 * 如: (...x) 把所有的参数放到一个数组集合中
 * 对这个集合进行约束
 */

type FlipArguments<T extends (...arg: any[]) => unknown> = T extends (
  ...arg: infer A
) => infer R
  ? (...x: reverse<A>) => R
  : never

type reverse<T extends any[]> = T extends [...infer L, infer R] ? [R, ...reverse<L>] : T


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3196/answer
  > View solutions: https://tsch.js.org/3196/solutions
  > More Challenges: https://tsch.js.org
*/
