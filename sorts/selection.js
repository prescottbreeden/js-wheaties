const selectionSort = (arr) => {
  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    let min = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[min]) {
        min = j;
      }
    }
    [result[i], result[min]] = [result[min], result[i]];
  }
  return result;
};
const arr = [5, 4, 3, 2, 1];
// const arr = [1, 2, 3, 5, 4];
console.log(selectionSort(arr));
console.log(arr);
