// sliding window pattern
function maxSubArray(arr, num) {
  if (num > arr.length) {
    return 0;
  }
  let sum = arr.slice(0, num).reduce((a, b) => a + b);
  let start = 1;
  let end = num + 1;
  while (end < arr.length) {
    const temp = sum - arr[start] + arr[end];
    sum = Math.max(sum, temp);
    start++;
    end++;
  }
  return sum;
}

console.log(maxSubArray([1, 1, 1, 1, 1, 1, 1, 1], 3));
console.log(maxSubArray([1, 1, 1, 1, 1, 1, 1, 1], 20));
