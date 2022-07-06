/*
  3376 - InorderTraversal
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement the type version of binary tree inorder traversal.
  
  For example:
  
  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const
  
  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```
  
  > View on GitHub: https://tsch.js.org/3376
*/

/* _____________ Your Code Here _____________ */

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}


type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
  : []




  /**
   * 最主要的还是防止分布的代码  [T] extends [TreeNode]，为什么需要这样？
   * 因为T(可能是?)是一个联合类型，然后后面又调用了InorderTraversal。会发生分布行为，就过深了。ts就报错了
   * 
   * 
   */
  // 下面是一个解决联合类型的写法
  // 判断条件改为 T extends null
  // 因为T是一个联合类型，就新建一个参数NT对T断言为TreeNode
  //  type InorderTraversal<T extends TreeNode | null, NT extends TreeNode = NonNullable<T>> =
  //  T extends null
  //  ?
  //  []
  //  :
  //  [...InorderTraversal<NT['left']>, NT['val'], ...InorderTraversal<NT['right']>];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3376/answer
  > View solutions: https://tsch.js.org/3376/solutions
  > More Challenges: https://tsch.js.org
*/
