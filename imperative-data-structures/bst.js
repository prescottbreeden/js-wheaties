console.log('--[ BST ]------------------');

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

  insert(val, node = this.root) {
    if (!this.root) return (this.root = new Node(val));
    if (val < node.val) {
      return node.left
        ? this.insert(val, node.left)
        : (node.left = new Node(val));
    } else {
      return node.right
        ? this.insert(val, node.right)
        : (node.right = new Node(val));
    }
  }

  findNode(val, node = this.root) {
    if (!node) {
      return false;
    }
    if (node.val === val) {
      return true;
    } else {
      return val > node.val
        ? findNode(val, node.right)
        : findNode(val, node.left);
    }
  }

  bfs(node = this.root) {
    let queue = [node];
    let data = [];
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  dfsPreOrder(node = this.root) {
    let data = [];
    function traverse(_node) {
      data.push(_node.val);
      if (_node.left) traverse(_node.left);
      if (_node.right) traverse(_node.right);
    }
    traverse(node);
    return data;
  }

  dfsInOrder(node = this.root) {
    let data = [];
    function traverse(_node) {
      if (_node.left) traverse(_node.left);
      data.push(_node.val);
      if (_node.right) traverse(_node.right);
    }
    traverse(node);
    return data;
  }

  dfsPostOrder(node = this.root) {
    let data = [];
    function traverse(_node) {
      if (_node.left) traverse(_node.left);
      if (_node.right) traverse(_node.right);
      data.push(_node.val);
    }
    traverse(node);
    return data;
  }

  filter(cond, node = this.root) {
    let data = [];
    function traverse(_node) {
      if (_node.left) traverse(_node.left);
      if (cond(_node)) data.push(_node.val);
      if (_node.right) traverse(_node.right);
    }
    traverse(node);
    return data;
  }
}

const bob = new BST();
bob.insert(10);
bob.insert(6);
bob.insert(15);
bob.insert(3);
bob.insert(8);
bob.insert(20);
console.log('BFS', bob.bfs());
console.log('pre', bob.dfsPreOrder());
console.log('post', bob.dfsPostOrder());
console.log('in', bob.dfsInOrder());
console.log(
  'even',
  bob.filter((x) => x.val % 2 === 0)
);
console.log(
  'odd',
  bob.filter((x) => x.val % 2 !== 0)
);
