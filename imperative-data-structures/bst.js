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

  addNode(val, node = this.root) {
    if (!this.root) return this.root = new Node(val);
    if (val < node.val) {
      return node.left === null
        ? node.left = new Node(val)
        : this.addNode(val, node.left)
    } else {
      return node.right === null
        ? node.right = new Node(val)
        : this.addNode(val, node.right)
    }
  }

  findNode(val, node = this.root) {
    if (!node) {
      return undefined;
    }
    if (node.val === val) {
      return node;
    } else {
      return val > node.val
        ? findNode(val, node.right)
        : findNode(val, node.left);
    }
  }
}
