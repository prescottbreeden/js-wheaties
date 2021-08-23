// ---------------------
// Concepts / Strategies
// ---------------------
// Dynamic Programming
// Divide and Conquer
// Moving Window
// Multiple Pointer
// Array Partition
// Binary Search

// ----------------
// Data Structures
// ----------------
// SLL
// addfront
// addback
// removefront
// removeback

// STACK
// push
// pop
// peek

// QUEUE (reg/circuluar)
// enqueue
// dequeue
class Queue {
  constructor() {
    this.values = [];
  }
  enqueue(val) {
    this.values.push(val);
    return this;
  }
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
  size: 1 + (left?.size ?? 0) + (right?.size ?? 0),
  height: 1 + (left ? left.height : right?.height ?? 0),
});

// insert :: number -> bst -> bst
const insert = (newValue) => ({ value, left, right }) =>
  newValue < value
    ? BST(value, left ? insert(newValue)(left) : BST(newValue), right)
    : BST(value, left, right ? insert(newValue)(right) : BST(newValue));

// min :: bst -> number
const min = (bst) => (bst.left ? min(left) : bst.value);

// max :: bst -> number
const max = (bst) => (bst.right ? max(right) : bst.value);

// delete :: number -> bst -> bst
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
  }
  return deleteValue < value
    ? BST(value, left ? deleteNode(deleteValue)(left) : left, right)
    : BST(value, left, right ? deleteNode(deleteValue)(right) : right);
};

// contains :: number -> bst -> boolean
const contains = (searchValue) => ({ value, left, right }) => {
  if (searchValue === value) {
    return true;
  } else if (searchValue < value) {
    return left ? contains(searchValue)(left) : false;
  } else {
    return right ? contains(searchValue)(right) : false;
  }
};

// filter :: predicate -> bst -> [number]
const filter = (predicate) => (bst) => {
  const result = [];
  const traverse = ({ value, left, right }) => {
    if (predicate(value)) result.push(value);
    if (left) traverse(left);
    if (right) traverse(right);
  };
  bst && traverse(bst);
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
  bst && traverse(bst);
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
  bst && traverse(bst);
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
  bst && traverse(bst);
  return result;
};

// bfs :: bst -> [number]
const bfs = (bst) => {
  const result = [];
  const queue = new Queue();
  queue.enqueue(bst);
  while (queue.values.length) {
    const node = queue.dequeue();
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
    result.push(node.value);
  }
  return result;
};

// mintree :: [number] -> bst
const mintree = (arr) => {
  const middleIndex = (arr) => Math.floor(arr.length / 2);
  let popped;
  // if even number of elements, pop the last element
  if (arr.length % 2 === 0) {
    popped = arr.pop();
  }
  const preOrdered = [];
  // divideArray :: [number] -> unit
  const preOrderedValues = (partition) => {
    if (partition.length <= 1) {
      preOrdered.push(...partition);
      return;
    }
    const middle = middleIndex(partition);
    preOrdered.push(partition[middle]);
    preOrderedValues(partition.slice(0, middle));
    preOrderedValues(partition.slice(middle + 1));
  };
  preOrderedValues(arr);
  // if array was popped, put element at end of pre-ordered list
  const [root, ...rest] = popped ? [...preOrdered, popped] : preOrdered;
  return rest.reduce((bst, curr) => insert(curr)(bst), BST(root));
};

// list of depths
// valuesAtDepths :: bst -> { [string]: number }
const valuesAtDepths = (bst) => {
  const result = {};
  const traverse = ({ value, left, right, height }) => {
    const key = bst.height - height;
    result[key] = [...(result[key] || []), value];
    if (left) traverse(left);
    if (right) traverse(right);
  };
  traverse(bst);
  return result;
};

// check balanced
// heights of two subtrees of any node never differ by more than 1
// bstIsBalanced :: bst -> boolean
const bstIsBalanced = (bst) => {
  const traverse = ({ left, right }) => {
    if (left && right) {
      return Math.abs(left.height - right.height) <= 1
        ? traverse(left) && traverse(right)
        : false;
    }
    return true;
  };
  return traverse(bst);
};

// valid bst
// validBst :: bst -> boolean
const validBST = (bst) => {
  const traverse = ({ value, left, right }) => {
    if (left && right) {
      return value < left.value || value > right.value
        ? false
        : traverse(left) && traverse(right);
    } else if (left) {
      return value < left.value ? false : traverse(left);
    } else if (right) {
      return value > right.value ? false : traverse(right);
    } else {
      return true;
    }
  };
  return traverse(bst);
};

// successor
const successor = (searchValue) => ({ value, left, right }) => {
  if (searchValue === value) {
    return left ? left : right;
  } else {
    return searchValue < value
      ? left
        ? successor(searchValue)(left)
        : left
      : right
      ? successor(searchValue)(right)
      : right;
  }
};

// Test Cases
// const pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
// const bst = [5, 15, 2, 7, 12, 20].reduce(
//   (acc, curr) => insert(curr)(acc),
//   BST(10)
// );
// const pipeline = pipe(deleteNode(15), inorder, mintree);
// const result = pipeline(bst);
// console.log(validBST(result));
// console.log(valuesAtDepths(bst));
// const unbalanced = [1, 0].reduce((bst, curr) => insert(curr)(bst), bst);
// console.log(bstIsBalanced(bst));
// console.log(bstIsBalanced(unbalanced));
// console.log(successor(15)(bst));

// Red-Black Tree
// maybe?

// GRAPH (un/directed, un/weighted)
class Graph {
  constructor() {
    this.g = {};
  }
  // addvertex
  addvertex(node) {
    this.g[node] = [];
  }
  // addedge (directed)
  addEdge(node1, node2) {
    this.g[node1].push(node2);
  }
  // bfs
  bfs(start) {
    if (!this.g[start]) return null;
    const results = [start];
    const visited = { [start]: true };
    const q = new Queue();
    q.enqueue(start);
    while (q.values.length) {
      const current = q.dequeue();
      this.g[current].forEach((node) => {
        if (!visited[node]) {
          visited[node] = true;
          results.push(node);
          q.enqueue(node);
        }
      });
    }
    return results;
  }
  // dfs
  dfs(start) {
    if (!this.g[start]) return null;
    const results = [start];
    const visited = { [start]: true };
    const stack = [];
    stack.push(start);
    while (stack.length) {
      const current = stack.pop();
      this.g[current].forEach((node) => {
        if (!visited[node]) {
          stack.push(node);
          results.push(node);
          visited[node] = true;
        }
      });
    }
    return results;
  }
  // shortestpath
  // dijkstra
}

const buildOrder = (list, dependencyTuples) => {
  const g = new Graph();
  list.forEach((v) => g.addvertex(v));
  dependencyTuples.forEach(([a, b]) => {
    g.addEdge(a, b);
  });
  const graphVertices = Object.keys(g.g);
  const directedEdges = dependencyTuples.map(([_, b]) => b);
  const independents = graphVertices.filter((n) => !directedEdges.includes(n));
  return independents.flatMap((v) => g.bfs(v));
};

// TRIE
// insert
// remove
// suggestions

// Special
// A*
