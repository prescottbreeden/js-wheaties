const frequencies = (list) => {
  return list.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});
};

function areThereDuplicates(...args) {
  const freq = frequencies(args);
  return Object.keys(freq).reduce(
    (acc, curr) => (acc ? acc : freq[curr] !== 1),
    false
  );
}

function averagePair(list, avg) {
  const distanceAway = (a) => avg * 2 - a;
  const missingPairs = list.reduce((acc, curr) => {
    acc[distanceAway(curr)] = true;
    return acc;
  }, {});
  for (let n of list) {
    if (missingPairs[n]) {
      return true;
    }
  }
  return false;
}

function averagePair2(list, avg) {
  const average = (a, b) => (a + b) / 2;
  let start = 0;
  let end = list.length - 1;

  while (start <= end) {
    const newAverage = average(list[start], list[end]);
    if (newAverage === avg) return true;
    else if (newAverage < avg) start++;
    else end--;
  }
  return false;
}

function maxSubarraySum(arr, length) {
  let running = arr.slice(0, length).reduce((acc, curr) => acc + curr, 0);
  let sum = running;
  let start = 1;
  let end = length;
  while (end < arr.length) {
    running = running - arr[start - 1] + arr[end];
    if (running > sum) {
      sum = running;
    }
    start++;
    end++;
  }
  return sum;
}

const a = maxSubarraySum([-3, 4, 0, -2, 6, -1], 2);
console.log(a);
