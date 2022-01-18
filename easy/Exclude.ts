/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in
  
  ### Question
  
  Implement the built-in Exclude<T, U>
  > Exclude from T those types that are assignable to U
  
  > View on GitHub: https://tsch.js.org/43
*/


/* _____________ Your Code Here _____________ */

type MyExclude<T, U> = T extends U ?  never : T

type myPick<T, U> = U extends T ? U : never



type xx = myPick<'a' | 'b' | 'c', 'a' | 'b' | 'e'>

type pp =  MyExclude<"a" | "b" | "c", "a">

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
    Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, Exclude<"a" | "b" | "c", "a" | "b">>>,
    Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/


/**
 * 现在 type example = 'a' | 'b' | 'c'
 * 当 example 在 extends 左边 是联合类型依次匹配如：
 * tpye bool = example extend 'a' | 'b' ? true : false
 */
type example = 'a' | 'b' | 'c'
type bool = 'b' | 'a' extends  'b'  ? 'true' : 'false'