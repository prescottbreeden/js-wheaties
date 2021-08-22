// ----------------
// Sorts
// ----------------
// Bubble
const bubble = (arr) => {
  for (let i = arr.length; i > 0; i--) {
    let swapped = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
};
const arr = [5, 4, 3, 2, 1];
bubble(arr);
console.log(arr);

// Selection
const selection = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
};
const arr2 = [5, 4, 3, 2, 1];
selection(arr2);
console.log(arr2);

// Insertion
const insertion = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let runner = i;
    while (arr[runner] < arr[runner - 1] && runner > 0) {
      [arr[runner], arr[runner - 1]] = [arr[runner - 1], arr[runner]];
      runner--;
    }
  }
};
const arr3 = [5, 4, 3, 2, 1];
insertion(arr3);
console.log(arr3);

// Merge
const mergeSort = (arr) => {
  function merge(arr1, arr2) {
    let i = 0;
    let j = 0;
    const arr = [];
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      arr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      arr.push(arr2[j]);
      j++;
    }
    return arr;
  }
  if (arr.length <= 1) {
    return arr;
  } else {
    const middle = Math.floor(arr.length / 2);
    const arr1 = mergeSort(arr.slice(0, middle));
    const arr2 = mergeSort(arr.slice(middle));
    return merge(arr1, arr2);
  }
};

console.log('merge', mergeSort([5, 4, 3, 2, 1]));

// Quick

// Radix

// HeapSort
