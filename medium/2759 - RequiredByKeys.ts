/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #中等 #object
  
  ### 题目
  
  实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。
  
  `K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。
  
  例如:
  
  ```ts
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > 在 Github 上查看：https://tsch.js.org/2759/zh-CN
*/


/* _____________ 你的代码 _____________ */

// 1. 如何判断他传值过来了的，目前使用默认值
// 2. T[P] 这里取值问题，ts没有推断出来p是T的key(如果extends后 ‘unknown’又不符合)

// 解
// 第一个问题，还是可以使用默认值判断。现在的解法中，不用判断是否传如值。传入了就用传入的。没传入就用默认的原对象的key就可以把源对象键值对变为必选
// 第二个问题，不应该在K上extends keyof T,这样肯定要需要符合T的键才可以传入。
// 解决办法就是把循环中的 P in K,改为P in keyof T

type RequiredByKeys1<T, K = keyof T> =
  { [P in keyof T as P extends K ? P : never]-?: T[P] } &
  { [P in keyof T as P extends K ? never : P]: T[P] } extends infer O ? (
    { [P in keyof O]: O[P] }
  ) : never

type RequiredByKeys<T, K = keyof T> =  flatObj<T & {
  [P in keyof T as  hasKey<K, P>]-? : T[P]
}>

type xp = {name: 0} & {age: 10}
type xp1 = {name: 0} & {name: 0}

type okm<T = any> = T extends never ? 1 : 2
type o = okm<1>

type flatObj<T> = {
  [P in keyof T]: T[P]
}

type hasKey<T, P> = P extends T ? P : never


type oo = RequiredByKeys<User, 'name'>

type i = { a: string } & { a?: string }

let testI: i = { a: 'undefined' }

type ok = RequiredByKeys<User, 'name' | 'age'>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}


type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  // Expect<Equal<RequiredByKeys<User, 'name'>, User & {name : string}>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2759/answer/zh-CN
  > 查看解答：https://tsch.js.org/2759/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

