/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #medium #array
  
  ### Question
  
  > TypeScript 4.0 is recommended in this challenge
  
  Implement a generic `Last<T>` that takes an Array `T` and returns its last element.
  
  For example
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```
  
  > View on GitHub: https://tsch.js.org/15
*/


/* _____________ Your Code Here _____________ */

// type Last<T extends any[]> = T extends [infer F, ...infer R] ? (R extends [] ? F : Last<R> ) : never

// type Last<T extends any[]> = T extends [infer Head, ...infer Tail] ? T extends [Head] ? Head : Last<Tail> :never;
type last<T extends any[]> = T extends [infer F, ...infer R] ? R : 'false'
// your answers
type Last<T extends unknown[]> = T extends [...infer Rest, infer Last] ? Last : never;
type y = Last<[1]>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/


/**
 * 
// type Last<T extends any[]> = T extends [infer F, ...infer R] ? (R extends [] ? F : Last<R> ) : F 最后这个F取不到，因为不满于extends就进不了赋值F的步骤
 * 
 */