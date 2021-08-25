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

const data = [1, 1, 2, 3];
const [head, ...tail] = data;
const sll1 = tail.reduce((acc, curr) => addBack(curr)(acc), SLL(head));
const sll2 = removeback(sll1);
const sll3 = removefront(sll2);
const sll4 = map((x) => x * 2)(sll1);

const removeDupes = (sll) => {
  let curr = sll;
  let prev = sll;
  const seen = { [sll.value]: true };
  while (curr) {
    seen[curr.value] = true;
    curr = curr.next;
    if (curr && seen[curr.value]) {
      prev.next = prev.next.next;
      curr = curr.next;
      prev = prev.next;
    } else {
      prev = prev.next;
    }
  }
  return sll;
};

// console.log('de-dupe', removeDupes(sll1));

// STACK
// push
// pop
// peek

// QUEUE (reg/circuluar)
class Q {
  constructor() {
    this.values = [];
  }
  // enqueue
  enqueue(value) {
    this.values.push(value);
    return this;
  }
  // dequeue
  dequeue() {
    return this.values.shift();
  }
}

// HEAP (max/min/priority)
// insert
// extract root

// BST
const BST = (value, left = null, right = null) => ({
  value,
  left,
  right,
  size: 1 + (left ? left.size : 0) + (right ? right.size : 0),
  height: 1 + Math.max(left ? left.height : 0, right ? right.height : 0),
});

// insert :: number -> bst -> bst
const insert = (newValue) => ({ value, left, right }) =>
  newValue < value
    ? BST(value, left ? insert(newValue)(left) : BST(newValue), right)
    : BST(value, left, right ? insert(newValue)(right) : BST(newValue));
// min :: bst -> number
const min = (bst) => (bst.left ? min(bst.left) : bst.value);
// max :: bst -> number
const max = (bst) => (bst.right ? max(bst.right) : bst.value);
// deleteNode :: number -> bst -> bst
const deleteNode = (deleteValue) => ({ value, left, right }) => {
  if (deleteValue === value) {
    if (left && right) {
      return left.size > right.size
        ? BST(max(left), deleteNode(max(left))(left), right)
        : BST(min(right), left, deleteNode(min(right))(right));
    } else if (!left && !right) {
      return null;
    } else {
      return left || right;
    }
  } else {
    return deleteValue < value
      ? BST(value, left ? deleteNode(deleteValue)(left) : left, right)
      : BST(value, left, right ? deleteNode(deleteValue)(right) : right);
  }
};
// contains :: number -> bst -> boolean
const contains = (number) => (bst) => {
  if (!bst) {
    return false;
  } else if (number === bst.value) {
    return true;
  } else {
    return number < bst.value
      ? contains(number)(bst.left)
      : contains(number)(bst.right);
  }
};
// filter :: predicate -> bst -> [number]
const filter = (predicate) => (bst) => {
  const result = [];
  const traverse = ({ value, left, right }) => {
    if (left) traverse(left);
    if (predicate(value)) result.push(value);
    if (right) traverse(right);
  };
  traverse(bst);
  return result;
};
// preorder :: bst -> [number]
const preorder = (bst) => {
  const result = [];
  const traverse = ({ value, left, right }) => {
    result.push(value);
    if (left) traverse(left);
    if (right) traverse(right);
  };
  traverse(bst);
  return result;
};
// inorder :: bst -> [number]
const inorder = (bst) => {
  const result = [];
  const traverse = ({ value, left, right }) => {
    if (left) traverse(left);
    result.push(value);
    if (right) traverse(right);
  };
  traverse(bst);
  return result;
};
// postorder :: bst -> [number]
const postorder = (bst) => {
  const result = [];
  const traverse = ({ value, left, right }) => {
    if (left) traverse(left);
    if (right) traverse(right);
    result.push(value);
  };
  traverse(bst);
  return result;
};
// bfs :: bst -> [number]
const bfs = (bst) => {
  const result = [];
  const queue = new Q();
  queue.enqueue(bst);
  while (queue.values.length) {
    const { value, left, right } = queue.dequeue();
    result.push(value);
    queue.enqueue(left).enqueue(right);
  }
  return result;
};
// mintree :: [number] -> bst
const minTree = (arr) => {
  const middleIndex = (arr) => Math.floor(arr.length / 2);
  let popped;
  if (arr.length % 2 === 0) {
    popped = arr.pop();
  }
  const preorder = [];
  const divide = (partition) => {
    if (partition.length <= 1) {
      preorder.push(...partition);
    } else {
      const middle = middleIndex(partition);
      preorder.push(partition[middle]);
      divide(partition.slice(0, middle));
      divide(partition.slice(middle + 1));
    }
  };
  divide(arr);
  const [root, ...values] = popped ? [...preorder, popped] : preorder;
  return values.reduce((acc, curr) => insert(curr)(acc), BST(root));
};
// valuesAtDepths :: bst -> { [string]: number }
const valuesAtDepths = (bst) => {
  const queue = new Q();
  const maxHeight = bst.height;
  const results = {};
  queue.enqueue(bst);
  while (queue.values.length) {
    const { height, value, left, right } = queue.dequeue();
    const h = maxHeight - height;
    if (results[h]) {
      results[h] = [...results[h], value];
    } else {
      results[h] = [value];
    }
    if (left) queue.enqueue(left);
    if (right) queue.enqueue(right);
  }
  return results;
};
// bstIsBalanced :: bst -> boolean
// heights of two subtrees of any node never differ by more than 1
const bstIsBalanced = ({ left, right }) => {
  if (left && right) {
    return Math.abs(left.height - right.height) <= 1
      ? bstIsBalanced(left) && bstIsBalanced(right)
      : false;
  } else if (left || right) {
    return left ? left.height <= 1 : right.height <= 1;
  } else {
    return true;
  }
};
// valid bst
// validBst :: bst -> boolean
const validBst = ({ value, left, right }) => {
  if (left && right) {
    return value > left.value && value < right.value
      ? validBst(left) && validBst(right)
      : false;
  } else if (left) {
    return left.value < value ? validBst(left) : false;
  } else if (right) {
    return right.value > value ? validBst(right) : false;
  } else {
    return true;
  }
};
// successor :: number -> bst
const successor = (number) => ({ value, left, right }) => {
  if (number === value) {
    return left ? left : right;
  } else if (number < value) {
    return successor(number)(left);
  } else {
    return successor(number)(right);
  }
};

// Test Cases
const bst = [5, 15, 2, 7, 12, 20].reduce(
  (acc, curr) => insert(curr)(acc),
  BST(10)
);
const pipe = (...fns) => (arg) => fns.reduce((acc, f) => f(acc), arg);

// console.log(bst);
// console.log(deleteNode(15)(bst));
// console.log(pipe(deleteNode(15), contains(15))(bst));
// console.log(preorder(bst));
// console.log(inorder(bst));
// console.log(postorder(bst));
// console.log(valuesAtDepths(bst));
// console.log(bstIsBalanced(bst));
// console.log(
//   pipe(deleteNode(15), deleteNode(20), deleteNode(12), bstIsBalanced)(bst)
// );
// console.log(successor(15)(bst));
// console.log(validBst(bst));
// console.log(pipe(deleteNode(15), inorder, minTree)(bst));
// console.log(filter((x) => x % 2 === 0)(bst));

// GRAPH (un/directed, un/weighted)
class Graph {
  constructor() {
    this.vertices = {};
  }
  // addvertex
  addvertex(vertex) {
    this.vertices[vertex] = [];
    return this;
  }
  // addedge (directed)
  addedge(a, b) {
    this.vertices[a].push(b);
    this.vertices[b].push(a);
    return this;
  }
  // bfs
  bfs(start) {
    const result = [];
    const visited = { [start]: true };
    const queue = new Q();
    queue.enqueue(start);
    while (queue.values.length) {
      const vertex = queue.dequeue();
      result.push(vertex);
      this.vertices[vertex].forEach((node) => {
        if (!visited[node]) {
          visited[node] = true;
          queue.enqueue(node);
        }
      });
    }
    return result;
  }
  // dfs
  dfs(start) {
    const result = [];
    const visited = { [start]: true };
    const stack = [];
    stack.push(start);
    while (stack.length) {
      const vertex = stack.pop();
      result.push(vertex);
      this.vertices[vertex].forEach((node) => {
        if (!visited[node]) {
          visited[node] = true;
          stack.push(node);
        }
      });
    }
    return result;
  }
  // shortestpath
  // dijkstra
}

const gr = new Graph();
gr.addvertex('a')
  .addvertex('b')
  .addvertex('c')
  .addvertex('d')
  .addvertex('e')
  .addvertex('f')
  .addvertex('g')
  .addvertex('h');

gr.addedge('a', 'b')
  .addedge('a', 'd')
  .addedge('b', 'c')
  .addedge('c', 'f')
  .addedge('d', 'c')
  .addedge('d', 'f')
  .addedge('e', 'g')
  .addedge('f', 'g')
  .addedge('g', 'h');

console.log(gr);
console.log(gr.bfs('a'));
console.log(gr.dfs('a'));
// TRIE
// insert
// remove
// suggestions

// Special
// A*
