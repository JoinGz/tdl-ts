/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object
  
  ### Question
  
  Implement the type of `just-flip-object`. Examples:
  
  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```
  
  No need to support nested objects and values which cannot be object keys such as arrays
  
  > View on GitHub: https://tsch.js.org/4179
*/


/* _____________ Your Code Here _____________ */

type Flip<T extends { [p in keyof any]: any}> = {
  [P in keyof T as `${T[P]}` ] : P
}

/**
 * 第一次书写为 
 */


// type Flip<T> = {
//   [P in keyof T as `${T[P]}` ] : P
// }

/**报错了，原因就是不晓得T[P]是个什么类型， 因为T不晓得什么类型，
 * 在T上取了一个P，P可推断为string | number | symbol，但是T[string] | T[number] | T[symbol]  无法推断*/



type testFlip = Flip<{ a: { b: 1 } }>

//  testFlip = {
//   [x: string]: "a";
// }

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/

