const mergeSort = (arr) => {
  const merge = (A, B) => {
    let a = 0;
    let b = 0;
    const result = [];
    while (a < A.length && b < B.length) {
      if (A[a] < B[b]) {
        result.push(A[a]);
        a++;
      } else {
        result.push(B[b]);
        b++;
      }
    }
    while (a < A.length) {
      result.push(A[a]);
      a++;
    }
    while (b < B.length) {
      result.push(B[b]);
      b++;
    }
    return result;
  };
  return arr.length <= 1
    ? arr
    : merge(
        mergeSort(arr.slice(0, Math.floor(arr.length / 2))),
        mergeSort(arr.slice(Math.floor(arr.length / 2)))
      );
};
const arr = [5, 4, 3, 2, 1];
const result = mergeSort(arr);
console.log(result);
