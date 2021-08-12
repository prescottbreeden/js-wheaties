const BST = (value, left = null, right = null) => ({
  value,
  left,
  right,
  size: 1 + (left ? left.size : 0) + (right ? right.size : 0),
});

const insert = (val) => ({ value, left, right }) =>
  val < value
    ? BST(value, left ? insert(val)(left) : BST(val), right)
    : BST(value, left, right ? insert(val)(right) : BST(val));

const preOrder = (bst) => {
  const result = [];
  const traverse = (node) => {
    result.push(node.value);
    if(node.left) traverse(node.left);
    if(node.right) traverse(node.right);
  }
  traverse(bst)
  return result;
};

const inOrder = (bst) => {
  const result = [];
  const traverse = (node) => {
    if(node.left) traverse(node.left);
    result.push(node.value);
    if(node.right) traverse(node.right);
  }
  traverse(bst)
  return result;
};

const postOrder = (bst) => {
  const result = [];
  const traverse = (node) => {
    if(node.left) traverse(node.left);
    if(node.right) traverse(node.right);
    result.push(node.value);
  }
  traverse(bst)
  return result;
};

const tree = [40, 50, 20, 22, 18, 48, 55].reduce(
  (acc, curr) => insert(curr)(acc),
  BST(42)
);

console.log('pre-order:  ', preOrder(tree));
console.log('in-order:   ', inOrder(tree));
console.log('post-order: ', postOrder(tree));
