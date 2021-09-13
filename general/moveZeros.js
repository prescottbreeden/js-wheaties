function swap(index1, index2, arr) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

function moveZerosToEnd_annotated(arr) {
  // initialize the window
  let start = 0;
  let end = 0;

  // while end-th element element is a 0
  while (arr[end] === 0) {
    // increase size of window
    end++;
  }
  // while the end of the window is less than the length of array
  while (end < arr.length) {
    // swap end with first element of window
    swap(start, end, arr);
    // while next element of window is a 0
    while (arr[end + 1] === 0) {
      // increase size of window
      end++;
    }
    // move the window
    start++;
    end++;
  }
}

function moveZerosToEnd(arr) {
  let start = 0;
  let end = 0;
  while (arr[end] === 0) {
    end++;
  }
  while (end < arr.length) {
    swap(start, end, arr);
    while (arr[end + 1] === 0) {
      end++;
    }
    start++;
    end++;
  }
}

const arr1 = [0, 1, 2, 0, 3, 0, 1, 2];
const arr2 = [0, 0];
const arr3 = [9, 0, 0, 9, 1, 2, 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9];
moveZerosToEnd(arr3);
console.log(arr3);
