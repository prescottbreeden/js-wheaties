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
  length: 1 + (next ? next.length : 0)
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

const findNode = (search) => (bst) =>
  match([
    [eq(null), () => false],
    [pipe(prop('value'), eq(search)), () => true],
    [pipe(prop('value'), gt(search)), pipe(prop('left'), findNode(search))],
    [pipe(prop('value'), lt(search)), pipe(prop('right'), findNode(search))],
  ])(bst);

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

// test cases

const tree = [6, 15, 3, 8, 20].reduce(
  (acc, curr) => insert(curr)(acc),
  BST(10)
);
const [root, ...rest] = preOrder(tree);
const tree2 = rest.reduce((acc, curr) => insert(curr)(acc), BST(root));

console.log('eq', eq(tree)(tree2));
console.log('find', findNode(8)(tree));
console.log('find', findNode(18)(tree));
console.log('listOfDepths', listOfDepths(tree2));
