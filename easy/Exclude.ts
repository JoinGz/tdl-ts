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

type MyExclude<T, U> = T extends U ? never : T

type myPick<T, U> = U extends T ? U : never



type example1 = myPick<'a' | 'b' | 'c', 'a' | 'b' | 'e'>

type example2 =  MyExclude<"a" | "b" | "c", "a">

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


// 错误的结论归纳
// 错误的结论归纳
// 错误的结论归纳

/**
 * 现在 type example = 'a' | 'b' | 'c'
 * 当 example 在 extends 左边 是联合类型依次匹配如：
 * tpye bool = example extend 'a' | 'b' ? true : false // false
 * 执行过程如下：
 * 'a' extend 'a' | 'b' ? true : false // true
 * 'b' extend 'a' | 'b' ? true : false // true
 * 'c' extend 'a' | 'b' ? true : false // false
 * 最后结合起来，就是false ？？？？ ？？？
 * 当 example 在 extends 右边边 是一个整体，不会拆分。如上面的 'a' | 'b'
 * 
 */


/**
 * 以上结论是错误的
 * 
 * 在 tpye bool = example extend 'a' | 'b' ? true : false
 * example 会视为一个整体进行对比，左右都是整体
 * 
 * 那么什么时候进行拆分对比呢？
 * 
 * 分配条件类型
 * 
 * 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。
 * 
 * 例如：
 * 
 * type P<T> = T extends 'x' ? string : number;
   type A3 = P<'x' | 'y'>  // A3的类型是 string | number
 * 
 * 
 * 该例中，extends的前参为T，T是一个泛型参数。在A3的定义中，给T传入的是’x’和’y’的联合类型'x' | 'y'，满足分配律，于是’x’和’y’被拆开，分别代入P<T>
 * 
 * P<'x' | 'y'> => P<'x'> | P<'y'>

  //'x'代入得到
  'x' extends 'x' ? string : number => string

  //'y'代入得到
  'y' extends 'x' ? string : number => number

 * 
 * 
 * 然后将每一项代入得到的结果联合起来，得到string | number

 * 总之，满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型

 * 分配条件类型中还有一些特点：参考 https://juejin.cn/post/6998736350841143326

 * 取消分配条件

  type P<T> = [T] extends ['x'] ? string : number;
  type A1 = P<'x' | 'y'> // number
  type A2 = P<never> // string

  在条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。
 */
type example = 'a' | 'b' | 'c'
type bool = example extends 'a' | 'b' ? 'true' : 'false'



type A2 = 'x' | 'y' extends 'x' ? string : number;

type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'> // ?