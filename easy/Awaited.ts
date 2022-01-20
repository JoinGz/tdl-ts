/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #简单 #promise #built-in
  
  ### 题目
  
  假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
  
  比如：`Promise<ExampleType>`，请你返回 ExampleType 类型。
  
  > 这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)
  
  > 在 Github 上查看：https://tsch.js.org/189/zh-CN
*/


/* _____________ 你的代码 _____________ */
// type MyAwaited<T extends Promise<any>> = T extends Promise<infer R> ? R extends Promise<any> ? MyAwaited<R> : R : never
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer P> ? P extends Promise<unknown>? MyAwaited<P>: P : T

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type oo = MyAwaited<Promise<'any' | 1>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]

// @ts-expect-error
type error = MyAwaited<number>



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/189/answer/zh-CN
  > 查看解答：https://tsch.js.org/189/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/


// 我的解题思路
/** 
 * 主要是infer 定义一个变量
 * 同时这个变量可能也会是返回一个Promise
 * 所以需要再次循环
 */

/**
 * 看到有些回答者使用的unknow,这里对两者的差异进行一些学习
 * any与unknown二者都是可以赋值给任意类型的， any 会绕过类型检查，直接可用，而 unkonwn 则必须要在判断完它是什么类型之后才能继续用，会使我们的代码更加安全。
 */