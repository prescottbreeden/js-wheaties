console.log('--[ SLL ]------------------');

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SLL {
  constructor() {
    this.head = null;
  }
  addBack(val, node = this.head) {
    if (!node) {
      this.head = new Node(val);
      return this;
    }
    return node.next
      ? this.addFront(val, node.next)
      : (() => {
          node.next = new Node(val);
          return this;
        })();
  }
  addFront(val, node = this.head) {
    if (!node) {
      this.head = new Node(val);
      return this;
    }
    const head = this.head;
    this.head = new Node(val);
    this.head.next = head;
    return this;
  }
}

module.exports = {
  Node,
  SLL,
};
