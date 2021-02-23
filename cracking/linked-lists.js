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
  // debug
  printNodeVals = (node = this.head) => {
    if (!node) return this;
    console.log('node', node.val);
    if (node && node.next) {
      this.printNodeVals(node.next);
    }
  }

  // addFront :: x -> SLL
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

  // removeDupesWithBuffer :: () -> SLL
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

  // removeDupesNoBuffer :: () -> SLL
  removeDupesNoBuffer = (start = 0) => {
    if (this.head === null) return this;
    let runner = this.head;
    let inc = 0;
    while (inc < start) {
      runner = runner.next;
      inc++;
    }
    const checkValue = runner.val;

    // recursion base case
    if (runner.next === null) return this;

    while(runner.next) {
      if (runner.next.val === checkValue) {
        runner.next = runner.next.next;
      }
      runner = runner.next;
    }
    return this.removeDupesNoBuffer(start + 1);
  }

  // returnNthToLast :: int -> node
  NthToLast = (nth, pos = undefined) => {
    if (this.head === null) return this;
    let runner = this.head;
    let length = 1;
    while (runner) {
      // recursion base case
      if (length === pos) {
        return runner;
      }
      runner = runner.next;
      if (runner) {
        length++;
      }
    }
    const position = length - nth;
    if (position <= 0) {
      throw new Error("SLL is too short.");
    }
    return this.NthToLast(nth, position);
  }

  // getLength :: () -> int
  getLength = () => {
    let length = 0;
    let runner = this.head;
    while(runner) {
      length++;
      runner = runner.next;
    }
    return length;
  }

  // deleteMiddleNode :: () -> SLL
  deleteMiddleNode = () => {
    const length = this.getLength();
    let position = 0;
    let runner = this.head;
    if (length <= 2) {
      return this;
    }
    while(runner) {
      position++;
      if (position === Math.floor(length/2)) {
        runner.next = runner.next.next;
        return this;
      } else {
        runner = runner.next;
      }
    }
    return this;
  }

  partition = (val) => {
    if (this.head === null) return this;
    const leftPartition = new SLL();
    const rightPartition = new SLL();
    let runner = this.head;
    while(runner) {
      if (runner.val < val) {
        leftPartition.addFront(runner.val);
      } else {
        rightPartition.addFront(runner.val);
      }
      runner = runner.next;
    }
    this.head = leftPartition.head;
    runner = this.head;
    while(runner.next) {
      runner = runner.next;
    }
    runner.next = rightPartition.head;
    return this;
  }
}

// ============================================================================
// 2.1 remove dupes
// ============================================================================
// Write code to remove duplications from an unsorted linked list
// How would you solve this problem if a temporary buffer is not allowed?
console.log('---[ bob ]---')
const bob = new SLL();
bob
  .addFront(5)
  .addFront(4)
  .addFront(3)
  .addFront(4)
  .addFront(2)
  .addFront(2)
  .addFront(8)
  .addFront(1)
  .removeDupesNoBuffer()
  .printNodeVals();
// bob.removeDupesWithBuffer();
// bob.removeDupesNoBuffer();


// ============================================================================
// 2.2 return nth to last
// ============================================================================
// Implement an algorithm to find the nth to last element of a singly linked 
// list.
const res = bob.NthToLast(5);

// ============================================================================
// 2.3 delete middle node
// ============================================================================
// Implement an algorithm to delete a node in the middle - any node but the first
// and last node and not necessarily the exact middle - of a singly linked list
// given only access to the node
console.log('---[ frank ]---')
const frank = new SLL();
frank
  .addFront(5)
  .addFront(4)
  .addFront(3)
  .deleteMiddleNode()
  .printNodeVals();

// ============================================================================
// 2.4 partition
// ============================================================================
// Write code to partition a linked list around a value X such that all nodes
// less than X come before nodes greater than or equal to X.
// Important: the partition element X can appear anywhere in the right partitiion
//
console.log('---[ sally ]---')
const sally = new SLL();
sally
  .addFront(3)
  .addFront(5)
  .addFront(8)
  .addFront(5)
  .addFront(10)
  .addFront(2)
  .addFront(1)
  .partition(5)
  .printNodeVals();

// ============================================================================
// 2.5 sum lists
// ============================================================================
// You have two numbers represented by a linked list, where each node contains
// a single digit. The digits are stored in reverse order, such that the 1s digit
// is at the head of the list. Write a function that adds the two numbers and 
// returns the sum as a linked list. (You are not allowed to cheat and just 
// convert the linked list to an integer)

// ============================================================================
// 2.6 palindrome
// ============================================================================
// Implement a function to check if a linked list is a palindrome

// ============================================================================
// 2.7 intersection
// ============================================================================
// Given two linked lists, determine if the two lists intersect. Return the 
// intersecting node. Note that the intersection is defined based on reference, 
// not value. That is, if the kth node of the first linked list is the exact 
// same node (by reference) as the jth node of the second linked list, then they
// are intersecting.
//

// ============================================================================
// 2.8 loop detection
// ============================================================================
// Given a linked list which might contain a loop, implement an algorithm that 
// returns the node at the beginning of the loop (if one exists).
