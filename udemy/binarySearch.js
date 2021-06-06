// divide and conquer strategy
function binarySearch(arr, num, start = 0, stop = arr.length - 1) {
  const guess = Math.floor((stop - start) / 2) + start;
  if (start > stop) {
    return false;
  } else if (arr[guess] === num) {
    return true;
  } else {
    return arr[guess] > num
      ? binarySearch(arr, num, start, guess - 1)
      : binarySearch(arr, num, guess + 1, stop);
  }
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));
console.log(binarySearch([new Array(100000)], 1000));
