const leftIndex = (index) => index * 2 + 1;
const rightIndex = (index) => index * 2 + 2;
const parentIndex = (index) => Math.floor((index - 1) / 2);
const swap = (a, b, xs) => ([xs[a], xs[b]] = [xs[b], xs[a]]);

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    let idx = this.values.length - 1;
    while (this.values[idx] < this.values[parentIndex(idx)]) {
      let parent = parentIndex(idx);
      swap(idx, parent, this.values);
      idx = parent;
    }
    return this;
  }

  sinkDown() {
    swap(0, this.values.length - 1, this.values);
    const result = this.values.pop();
    let idx = 0;
    while (
      this.values[leftIndex(idx)] < this.values[idx] ||
      this.values[rightIndex(idx)] < this.values[idx]
    ) {
      const left = this.values[leftIndex(idx)];
      const right = this.values[rightIndex(idx)];
      if (left && right) {
        const shouldSwap = left < right ? leftIndex(idx) : rightIndex(idx);
        swap(idx, shouldSwap, this.values);
        idx = shouldSwap;
      } else if (left || right) {
        const shouldSwap = left ? leftIndex(idx) : rightIndex(idx);
        swap(idx, shouldSwap, this.values);
        idx = shouldSwap;
      }
    }
    return result;
  }

  extractRoot() {
    if (this.values.length === 0) {
      return undefined;
    } else if (this.values.length === 1) {
      return this.values.pop();
    } else {
      return this.sinkDown();
    }
  }
}

const heapify = (arr) => {
  const heap = new MinBinaryHeap();
  arr.forEach((v) => heap.insert(v));
  return heap;
};

const heapSort = (arr) => {
  const minHeap = heapify(arr);
  const result = [];
  while (minHeap.values.length) {
    result.push(minHeap.extractRoot());
  }
  return result;
};

const arr = [1, 42, 35, 12, 5, 67, 7, 8, 3, 4, 13, 14, 100];
console.log(heapSort(arr));
const arr2 = [1, 42, 35, 12, 5, 67];
console.log(heapSort(arr2));
