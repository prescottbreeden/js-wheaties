const insertionSort = (arr) => {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    let idx = i;
    while (result[idx] < result[idx - 1] && idx > 0) {
      [result[idx], result[idx - 1]] = [result[idx - 1], result[idx]];
      idx--;
    }
  }
  return result;
};
const arr = [5, 4, 3, 2, 1];
// const arr = [1, 2, 3, 5, 4];
console.log(insertionSort(arr));
console.log(arr);
