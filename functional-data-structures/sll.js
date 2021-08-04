class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SLL {
  constructor(head = null) {
    this.head = head;
  }

  _map = (f, node) => {
    if (!node) return node;
    return node.next === null
      ? new Node(f(node.val))
      : new Node(f(node.val), this._map(f, node.next));
  };

  _addBack = (val, node) => {
    if (!node) return node;
    return node.next === null
      ? new Node(node.val, new Node(val))
      : new Node(node.val, this._addBack(val, node.next));
  };

  // map :: f -> sll
  map(f) {
    if (!this.head) return this;
    return new SLL(this._map(f, this.head));
  }

  // addFront :: x -> sll
  addFront(val) {
    return new SLL(new Node(val, this.head));
  }

  // addBack :: x -> sll
  addBack(val, node = this.head) {
    return node === null
      ? new SLL(new Node(val))
      : new SLL(this._addBack(val, node));
  }
}
