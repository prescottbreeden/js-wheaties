const match = (predMatrix) => (arg) => {
  for (let [p, f] of predMatrix) {
    if (p(arg)) {
      return f(arg);
    }
  }
  throw new Error('Not all cases satisified in match.');
};

const add = (a) => (b) => a + b;
const always = (a) => (_) => a;
const divideBy = (b) => (a) => a / b;
const eq = (a) => (b) => JSON.stringify(a) === JSON.stringify(b);
const mult = (a) => (b) => a * b;
const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
const pop = (xs) => xs.pop();
const prop = (property) => (obj) => obj[property];
const subtractBy = (a) => (b) => b - a;

const swap = (idx1, idx2, arr) => {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
};

// parent :: a -> [a] -> a
const parent = pipe(subtractBy(1), divideBy(2), Math.floor);

// leftChild :: a -> [a] -> a
const leftChild = pipe(mult(2), add(1));

// rightChild :: a -> [a] -> a
const rightChild = pipe(mult(2), add(2));

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue = (newValue) => {
    this.values.push(newValue);
    let index = this.values.length - 1;
    while (index > 0) {
      if (
        this.values[parent(index, this.values)].priority <= newValue.priority
      ) {
        break;
      }
      const swap = parent(index, this.values);
      const temp = this.values[swap];
      this.values[swap] = newValue;
      this.values[index] = temp;
      index = swap;
    }
    return this;
  };

  bubbleDown = (values) => {
    let index = 0;
    const val = values.pop();
    const root = values[index];
    values[index] = val;
    while (
      leftChild(index) < this.values.length ||
      rightChild(index) < this.values.length
    ) {
      const left = this.values[leftChild(index)];
      const right = this.values[rightChild(index)];
      if (left && right) {
        if (left.priority < right.priority) {
          swap(index, leftChild(index), this.values);
          index = leftChild(index);
        } else {
          swap(index, rightChild(index), this.values);
          index = rightChild(index);
        }
      } else if (left && val.priority > left.priority) {
        swap(index, leftChild(index), this.values);
        index = leftChild(index);
      } else if (right && val.priority > right.priority) {
        swap(index, rightChild(index), this.values);
        index = rightChild(index);
      } else {
        break;
      }
    }
    return root;
  };

  dequeue = () => {
    return match([
      [pipe(prop('length'), eq(0)), always(undefined)],
      [pipe(prop('length'), eq(1)), pop],
      [() => true, this.bubbleDown],
    ])(this.values);
  };
}

const pq = new PriorityQueue();
[
  { priority: 1, value: 'dingo' },
  { priority: 2, value: 'baby' },
  { priority: 0, value: 'bob ross' },
  { priority: 1, value: 'rubber' },
  { priority: 3, value: 'bumpers' },
  { priority: 2, value: 'buggy' },
].reduce((acc, curr) => acc.enqueue(curr), pq);
console.log('result', pq.dequeue());
console.log('result', pq.dequeue());
console.log('result', pq.dequeue());
console.log('result', pq.dequeue());
console.log('result', pq.dequeue());
console.log('result', pq.dequeue());
