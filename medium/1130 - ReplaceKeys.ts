/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #medium 
  
  ### Question
  
  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments. 
  
  
  For example:
  
  ```ts
  type NodeA = {
    type: 'A'
    name: string
    flag: number
  }
  
  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }
  
  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }
  
  
  type Nodes = NodeA | NodeB | NodeC
  
  type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> 
  // {type: 'A', name: number, flag: string} | 
  {type: 'B', id: number, flag: string} | 
  {type: 'C', name: number, flag: string} 
  // would replace name from string to number, replace flag from number to string.
  
  type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> 
  // {type: 'A', name: never, flag: number} | 
  NodeB | 
  {type: 'C', name: never, flag: number} 
  // would replace name to never
  ```
  
  > View on GitHub: https://tsch.js.org/1130
*/


/* _____________ Your Code Here _____________ */


type xx = keyof {a: string} | {b: number}
type xx2 = keyof {a: string} | {b: number}

type D2<T> =  keyof T 
type exp3 = D2<{a: string} | {b: number}>

type f1<T> =  {[P in keyof T]: boolean }
type exp4 = f1<{a: string} | {b: number}>
type f2<T> =  T extends T ? {[P in keyof T]: boolean } : never
type exp5 = f1<{a: string} | {b: number}>

var i:exp4 = {a: true}

// type ReplaceKeys<U, T, Y> =  {
//   [P in keyof U]: P extends T ?  P extends keyof Y ?  Y[P] : never : U[P]
// }
type ReplaceKeys<U, T, Y> =  U extends U ? {
  [P in keyof U]: P extends T ?  P extends keyof Y ?  Y[P] : never : U[P]
} : never

type a = ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>
type aa = ReplaceKeys<Nodes, 'name', { aa: number }>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1130/answer
  > View solutions: https://tsch.js.org/1130/solutions
  > More Challenges: https://tsch.js.org
*/


type A<T> = string extends T ? "yes" : "no"

type exp = A<'1' | 2>

type B<T> = { x: T } extends { x: number } ? "yes" : "no"

type exp1 = B<'1' | 2>



type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type T20 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string
type T21 = Bar<{
  a: (x: { name: string }) => void;
  b: (x: { age: number }) => void;
}>; // { name: string;} & { age: number;}

