/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.
  
  For example
  
  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }
  
  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```
  
  > View on GitHub: https://tsch.js.org/2757
*/


/* _____________ Your Code Here _____________ */

type PartialByKeys<T, K extends keyof any = keyof T> =  Copy<{
  [P in keyof T as P extends K ? never : P]: T[P]
} & {
  [P in K as P extends keyof T ? P : never]?: P extends keyof T ? T[P] : never
}>

// your answers
type Copy<T> = {
  [K in keyof T]: T[K]
}

type PartialByKeys1<T, K extends keyof any = keyof T> = Copy<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>

type ooo = PartialByKeys<User, 'name'>

type ll = PartialByKeys<User, 'name' | 'unknown'>
type ll2 = PartialByKeys<User, 'name' | 'age'>
// type ooo = {
//   age: number;
//   address: string;
// } & {
//   name?: string | undefined;
// }
let a: ooo = {
  age: 1,
  address: '',
  name: ''
}
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/

