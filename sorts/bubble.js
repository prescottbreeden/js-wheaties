const bubbleSort = (arr) => {
  let result = [...arr];
  for (let i = arr.length; i > 0; i--) {
    let swapped = false;
    for (let j = 0; j < arr.length - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
};

const arr = [5, 4, 3, 2, 1];
// const arr = [1, 2, 3, 5, 4];
console.log(bubbleSort(arr));
console.log(arr);
