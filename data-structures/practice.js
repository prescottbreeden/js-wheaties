// ---------------------
// Concepts / Strategies
// ---------------------
// Dynamic Programming
// Divide and Conquer
// Moving Window
// Multiple Pointer
// Array Partition
// Binary Search
// search :: number -> (arr, number, number) -> boolean
const search = (number) => (arr, start = 0, end = arr.length - 1) => {
  const mid = start + Math.floor((end - start) / 2);
  if (start > end) {
    return false;
  } else if (arr[mid] === number) {
    return true;
  } else if (arr[mid] < number) {
    return search(number)(arr, mid + 1, end);
  } else {
    return search(number)(arr, start, mid - 1);
  }
};

// ----------------
// Data Structures
// ----------------
// SLL :: (number, SLL) -> SLL
const SLL = (value, next = null) => ({
  value,
  next,
  length: 1 + (next ? next.length : 0),
});

// addfront :: number -> SLL -> SLL
const addFront = (newValue) => (sll) => SLL(newValue, sll);

// addback :: number -> SLL -> SLL
const addBack = (newValue) => ({ value, next }) =>
  SLL(value, next ? addBack(newValue)(next) : SLL(newValue));

// removefront :: SLL -> SLL
const removefront = ({ next }) => next;

// removeback :: SLL -> SLL
const removeback = ({ value, next }) =>
  next?.next ? SLL(value, removeback(next)) : SLL(value);
// map :: fn -> SLL -> SLL
const map = (fn) => ({ value, next }) =>
  SLL(fn(value), next ? map(fn)(next) : next);

const data = [0, 2, 2, 2];
const [head, ...tail] = data;
const sll1 = tail.reduce((acc, curr) => addBack(curr)(acc), SLL(head));
const sll2 = removeback(sll1);
const sll3 = removefront(sll2);
const sll4 = map((x) => x * 2)(sll1);

const removeDupes = (sll) => {
  let runner1 = sll;
  let runner2 = sll.next;
  const seen = { [sll.value]: true };
  while (runner1) {
    if (runner2) {
      seen[runner2.value] = true;
    }
    runner2 = runner2.next;
    if (seen[runner1.value]) {
    }
    runner.next = seen[runner.next?.value] ? runner.next?.next : runner.next;
    runner = runner.next;
  }
  return sll;
};

console.log('de-dupe', removeDupes(sll1));

// STACK
// push
// pop
// peek

// QUEUE (reg/circuluar)
class Queue {
  constructor() {}
}
// enqueue
// dequeue

// HEAP (max/min/priority)
// insert
// extract root

// BST
// insert :: number -> bst -> bst
// min :: bst -> number
// max :: bst -> number
// delete :: number -> bst -> bst
// contains :: number -> bst -> boolean
// filter :: predicate -> bst -> [number]
// preorder :: bst -> [number]
// inorder :: bst -> [number]
// postorder :: bst -> [number]
// bfs :: bst -> [number]
// mintree :: [number] -> bst
// valuesAtDepths :: bst -> { [string]: number }
// bstIsBalanced :: bst -> boolean
// heights of two subtrees of any node never differ by more than 1
// valid bst
// validBst :: bst -> boolean
// successor :: number -> bst

// GRAPH (un/directed, un/weighted)
// addvertex
// addedge (directed)
// bfs
// dfs
// shortestpath
// dijkstra

// TRIE
// insert
// remove
// suggestions

// Special
// A*
