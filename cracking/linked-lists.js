class Node {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}
class SLL {
  constructor() {
    this.head = null;
  }
  printNodeVals = (node = this.head) => {
    if (!node) return this;
    console.log('node', node.val);
    if (node && node.next) {
      this.printNodeVals(node.next);
    }
  }
  addFront = (val) => {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = new Node(val);
      return this;
    }
    const temp = this.head;
    this.head = newNode;
    newNode.next = temp;
    return this;
  }
  removeDupesWithBuffer = () => {
    if (this.head === null) return this;
    const dupes = {
      [this.head.val]: true
    };
    let runner = this.head;
    while(runner.next) {
      const { val } = runner.next;
      if (dupes[val]) {
        runner.next = runner.next.next;
      } else {
        dupes[val] = true;
        runner = runner.next;
      }
    }
    return this;
  }
  removeDupesNoBuffer = (start = 0) => {
    if (this.head === null) return this;
    let runner = this.head;
    let bunny = start;
    while (bunny > 0) {
      runner = runner.next;
      bunny--;
    }
    const checkValue = runner.val;
    if (runner.next === null) {
      return this;
    }
    while(runner.next) {
      if (runner.next.val === checkValue) {
        runner.next = runner.next.next;
      }
      runner = runner.next;
    }
    return this.removeDupesNoBuffer(start + 1);
  }
}

// ============================================================================
// 2.1 remove dupes
// ============================================================================
// Write code to remove duplications from an unsorted linked list
// How would you solve this problem if a temporary buffer is not allowed?
const bob = new SLL();
bob
  .addFront(5)
  .addFront(4)
  .addFront(3)
  .addFront(4)
  .addFront(2)
  .addFront(2)
  .addFront(8)
  .addFront(1);
// bob.removeDupesWithBuffer();
bob.removeDupesNoBuffer();
bob.printNodeVals();


// ============================================================================
// 2.2 return nth to last
// ============================================================================
// Implement an algorithm to find the nth to last element of a singly linked 
// list.

// ============================================================================
// 2.3 delete middle node
// ============================================================================
// Implement an algorithm to delete a node in the middle - any node but the first
// and last node and not necessarily the exact middle - of a singly linked list
// given only access to the node
// Examples

// ============================================================================
// 2.4 partition
// ============================================================================
// Write code to partition a linked list around a value X such that all nodes
// less than X come before nodes greater than or equal to X.
// Important: the partition element X can appear anywhere in the right partitiion
// it does not need to appear in the left partition ? 
