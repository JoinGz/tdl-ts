/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys
  
  ### 题目
  
  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。
  
  实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
  
  `K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。
  
  例如
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```
  
  > 在 Github 上查看：https://tsch.js.org/8/zh-CN
*/


/* _____________ 你的代码 _____________ */

// type MyReadonly2<T, K> = K extends K ? {} : {
//  readonly [P in keyof T]: T[P]
// }
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<T> & Omit<T, K>

type exc1 = Readonly<Todo1>
type exc2 = Omit<Todo1, 'title' | 'description'>
type exc3 = exc1 & exc2

const a: exc3 = {
  title: "string",
  completed: false
}

  
type exp1 = {str: boolean} & {str1: string}

const testA : exp1 = {
  str: false,
  str1: '',
}


/* _____________ 测试用例 _____________ */
import { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8/answer/zh-CN
  > 查看解答：https://tsch.js.org/8/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/


/**
 * 如何判断K是否存在?
 * 这里没有判断他是否存在，而是让他来自于T, K = keyof T
 * 
 * 去除 readonly {readonly test: string} & { test: string } 合并后的值去除了readonly
 */