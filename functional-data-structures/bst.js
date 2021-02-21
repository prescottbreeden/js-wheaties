class Node {
  constructor(val, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.val = val;
  }
}

class BST {
  constructor(root = null) {
    this.root = root;
  }

  _add = (val, node) => {
    if (!node) return node;
    if (val < node.val) {
      return node.left === null
        ? new Node(node.val, new Node(val), node.right)
        : new Node(node.val, this._add(val, node.left), node.right)
    } else {
      return node.right === null
        ? new Node(node.val, node.left, new Node(val))
        : new Node(node.val, node.left, this._add(val, node.right))
    }
  }

  add(val) {
    return this.root === null
      ? new BST(new Node(val))
      : new BST(this._add(val, this.root))
  }

}

// test cases
const bst = new BST();
bst
  .add(8)
  .add(2)
  .add(1)
  .add(3)
  .printNode();

bst
  .add(12)
  .add(42)
  .add(88)
  .add(3)
  .printNode();


