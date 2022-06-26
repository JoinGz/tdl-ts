/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement the type version of ```Object.entries```
  
  For example 
  
  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```
  
  > View on GitHub: https://tsch.js.org/2946
*/


/* _____________ Your Code Here _____________ */

/**
 * 第一版虽然实现了，但复杂
 * 在处理undefined时，判断了是否是union类型然后删除undefined
 */
// type ObjectEntries<T> = forT<T,keyof T>

// type forT<T, K> =  K extends keyof T ? [K, deleteUndefined<T[K]>] : never 
// type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false

// type deleteUndefined<T> = IsUnion<T> extends true ? T extends undefined ? never : T : T

/**
 * 第二版
 * 是undefined则保留
 * 不是这去掉可选然后取值 Required<T>[K]
 */

 type ObjectEntries<T, K = keyof T> = K extends keyof T ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/

