const assert = require('assert');

const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
const eq = (a) => (b) => JSON.stringify(a) === JSON.stringify(b);
const gt = (a) => (b) => b > a;
const lt = (a) => (b) => b < a;
const prop = (property) => (obj) => obj[property];
const match = (predicateFnMatrix) => (arg) => {
  for (let [p, f] of predicateFnMatrix) {
    if (p(arg)) {
      return f(arg);
    }
  }
  throw new Error('Not all paths matched in Match');
};
const trace = (msg) => (x) => console.log(msg, x) || x;

// SLL
const SLL = (value, next = null) => ({
  value,
  next,
  length: 1 + (next ? next.length : 0),
});
const addFront = (newValue) => (sll) => SLL(newValue, sll);
const addBack = (newValue) => (sll) =>
  sll
    ? SLL(sll.value, sll.next ? addBack(newValue)(sll.next) : SLL(newValue))
    : SLL(newValue);

// QUEUE
class Queue {
  constructor() {
    this.head = null;
  }
  get hasValues() {
    return this.head !== null;
  }
  enqueue(value) {
    this.head = addBack(value)(this.head);
  }
  dequeue() {
    const { value, next } = this.head;
    this.head = next;
    return value;
  }
}

// BST
const height = (left, right) => {
  if (left && right) {
    return Math.max(left.height, right.height);
  } else if (left || right) {
    return left ? left.height : right.height;
  } else {
    return 0;
  }
};

const BST = (value, left = null, right = null) => ({
  value,
  left,
  right,
  size: 1 + (left ? left.size : 0) + (right ? right.size : 0),
  height: 1 + height(left, right),
});

const insert = (newValue) => ({ value, left, right }) =>
  newValue < value
    ? BST(value, left ? insert(newValue)(left) : BST(newValue), right)
    : BST(value, left, right ? insert(newValue)(right) : BST(newValue));

const max = (bst) => (bst.right ? max(bst.right) : bst.value);
const min = (bst) => (bst.left ? min(bst.left) : bst.value);

const contains = (search) => (bst) =>
  match([
    [eq(null), () => false],
    [pipe(prop('value'), eq(search)), () => true],
    [pipe(prop('value'), gt(search)), pipe(prop('left'), contains(search))],
    [pipe(prop('value'), lt(search)), pipe(prop('right'), contains(search))],
  ])(bst);

const filter = (predicate) => (bst) => {
  let data = [];
  function traverse({ value, left, right }) {
    if (predicate(value)) data.push(value);
    if (left) traverse(left);
    if (right) traverse(right);
  }
  traverse(bst);
  return data;
};

const remove = (search) => ({ value, left, right }) => {
  if (search === value) {
    if (left && right) {
      return left.size > right.size
        ? BST(min(right), left, remove(min(right))(right))
        : BST(max(left), remove(max(left))(left), right);
    } else if (!left && !right) {
      return null;
    } else {
      return left || right;
    }
  } else {
    return search < value
      ? BST(value, remove(search)(left), right)
      : BST(value, left, remove(search)(right));
  }
};

const preOrder = (bst) => {
  const data = [];
  const traverse = ({ value, left, right }) => {
    data.push(value);
    if (left) traverse(left);
    if (right) traverse(right);
  };
  traverse(bst);
  return data;
};

const inOrder = (bst) => {
  const data = [];
  const traverse = ({ value, left, right }) => {
    if (left) traverse(left);
    data.push(value);
    if (right) traverse(right);
  };
  traverse(bst);
  return data;
};

const postOrder = (bst) => {
  const data = [];
  const traverse = ({ value, left, right }) => {
    if (left) traverse(left);
    if (right) traverse(right);
    data.push(value);
  };
  traverse(bst);
  return data;
};

const bfs = (bst) => {
  const result = [];
  const nodes = new Queue();
  nodes.enqueue(bst);
  while (nodes.values.length) {
    const { value, left, right } = nodes.dequeue();
    result.push(value);
    if (left) nodes.enqueue(left);
    if (right) nodes.enqueue(right);
  }
  return result;
};

const listOfDepths = (bst) => {
  const result = {};
  const nodes = new Queue();
  nodes.enqueue(bst);
  while (nodes.hasValues) {
    const { value, left, right, height } = nodes.dequeue();
    result[height] = addFront(value)(result[height]);
    if (left) nodes.enqueue(left);
    if (right) nodes.enqueue(right);
  }
  return result;
};

const minimalTree = (values) => {
  const middleIdx = (arr) => Math.floor(arr.length / 2);

  let shift;
  if (values.length % 2 === 0) {
    shift = values.pop();
  }
  const preOrdered = [];
  const divide = (partition) => {
    if (partition.length <= 1) {
      preOrdered.push(...partition);
      return;
    }
    const middle = middleIdx(partition);
    preOrdered.push(partition[middle]);
    divide(partition.slice(0, middle));
    divide(partition.slice(middle + 1));
  };
  divide(values);
  const [root, ...rest] = shift ? [...preOrdered, shift] : preOrdered;
  return rest.reduce((acc, curr) => insert(curr)(acc), BST(root));
};

// heights of two subtrees of any node never differ by more than 1
const checkBalanced = ({ left, right }) => {
  console.log(left, right);
  if (left && right) {
    console.log('abs', Math.abs(left.height - right.height) === 1);
    if (Math.abs(left.height - right.height) === 1) {
      return checkBalanced(left) && checkBalanced(right);
    } else {
      return false;
    }
  } else {
    return true;
  }
};

// check if a bst is valid
const validBST = (bst) => bst;

// find the "next" node (in-order successor)) of a given node
// you may assume each node has a link to it's parent
const successor = (node) => node;

const buildOrder = () => null;

// test cases
const tree = [6, 15, 3, 8, 20].reduce(
  (acc, curr) => insert(curr)(acc),
  BST(10)
);
const [root, ...rest] = preOrder(tree);
const tree2 = rest.reduce((acc, curr) => insert(curr)(acc), BST(root));
const minTree = minimalTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

console.log('=============================');
assert.strictEqual(eq(tree)(tree2), true);
assert.strictEqual(contains(8)(tree), true);
assert.strictEqual(contains(7)(tree), false);
assert.strictEqual(Object.keys(listOfDepths(tree2)).length, 3);
assert.strictEqual(listOfDepths(tree2)['1'].length, 3);
assert.strictEqual(listOfDepths(tree2)['2'].length, 2);
assert.strictEqual(listOfDepths(tree2)['3'].length, 1);
assert.strictEqual(minTree.height, 4);
// assert.strictEqual(checkBalanced(minTree), true);
checkBalanced(minTree);
console.log('all tests passed');
