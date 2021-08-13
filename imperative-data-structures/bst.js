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
});

const addFront = (newValue) => (sll) => SLL(newValue, sll);

const addBack = (newValue) => (sll) =>
  sll
    ? SLL(sll.value, sll.next ? addBack(newValue)(sll.next) : SLL(newValue))
    : SLL(newValue);

// QUEUE
class Queue {
  constructor() {
    this.values = [];
  }
  enqueue(value) {
    this.values.push(value);
  }
  dequeue() {
    return this.values.shift();
  }
}

// BST

const BST = (value, left = null, right = null) => ({
  value,
  left,
  right,
  size: 1 + (left ? left.size : 0) + (right ? right.size : 0),
  height: 1 + (left ? left.height : right ? right.height : 0),
});

const insert = (newValue) => ({ value, left, right }) =>
  newValue < value
    ? BST(value, left ? insert(newValue)(left) : BST(newValue), right)
    : BST(value, left, right ? insert(newValue)(right) : BST(newValue));

const findNode = (value) => (arg) =>
  match([
    [eq(null), () => false],
    [pipe(prop('value'), eq(value)), () => true],
    [pipe(prop('value'), gt(value)), pipe(prop('left'), findNode(value))],
    [pipe(prop('value'), lt(value)), pipe(prop('right'), findNode(value))],
  ])(arg);

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

const bfs = (bst) => {
  const result = [];
  const nodes = new Queue();
  nodes.enqueue(bst);
  while (nodes.values.length) {
    const { value, left, right } = nodes.dequeue();
    result.push(value);
    left && nodes.enqueue(left);
    right && nodes.enqueue(right);
  }
  return result;
};

const listOfDepths = (bst) => {
  const result = {};
  const nodes = new Queue();
  nodes.enqueue(bst);
  while (nodes.values.length) {
    const { value, left, right, height } = nodes.dequeue();
    result[height] = addFront(value)(result[height]);
    left && nodes.enqueue(left);
    right && nodes.enqueue(right);
  }
  return result;
};

// test cases

const tree = [6, 15, 3, 8, 20].reduce(
  (acc, curr) => insert(curr)(acc),
  BST(10)
);
const [root, ...rest] = preOrder(tree);
const tree2 = rest.reduce((acc, curr) => insert(curr)(acc), BST(root));
console.log('listOfDepths', listOfDepths(tree2));
