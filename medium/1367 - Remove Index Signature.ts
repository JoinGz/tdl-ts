/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium 
  
  ### Question
  
  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.
  
  For example:
  
  ```
  
  type Foo = {
    [key: string]: any;
    foo(): void;
  }
  
  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
  
  ```
  
  > View on GitHub: https://tsch.js.org/1367
*/


/* _____________ Your Code Here _____________ */



type handler<T> = string extends T ? never : number extends T ?  never : symbol extends T ? never : T 
type RemoveIndexSignature<T> = {[P in keyof T as handler<P>]: T[P]}

type x = handler<string | number >

type ink = RemoveIndexSignature<Foo>
/**
 * 思路
 * 第一次写的
 * type RemoveIndexSignature<T> = {[P in M<T, keyof T>]: T[P] extends Function ? T[P] : never}
 * 在循环中对剔除，如 [p in 'a' | 'b'] 剔除成 [p in 'a' ]
 * 但是keyof会有一些问题如
 * type keys = keyof {
    [key: string]: any
  } // keys = string | number

  查看答案后，可以对key直接进行处理

  语法 [p in keyof as handler<p>]

  但是 原始值的时候就直接过滤掉
  string  number symbol  (keyof any)

  方法二，利用字符串和自己相等

  // for non-IndexSignature, K is "xxx" type string
  // for IndexSignature, K is either string, number, symbol
type RemoveIndexSignature<T extends Record<keyof any, unknown>> = {
  [K in keyof T as K extends `${infer S}` ? S : never]: T[K];
}
 */


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
}

type FooBar = {
  [key: symbol]: any
  foobar(): void
}

type Baz = {
  bar(): void
  baz: string
}



type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

