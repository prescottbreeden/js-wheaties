const sumZero = (arr) => {
  let left = 0;
  let right = arr.length - 1;

  const move = (left, right) => {
    if (left >= right) return [];
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      return move(left, --right);
    } else {
      return move(left--, right);
    }
  };
  return move(left, right);
};

console.log(sumZero([-4, -3, 0, 1, 2, 4, 5]));

// sorry colt
const countUnique = (arr) => {
  const map = arr.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: true,
    };
  }, {});
  return Object.values(map).length;
};

const countUnique2 = (arr) => {
  return new Set(arr).size;
};

console.log('unique', countUnique2([1, 1, 1, 1, 1, 2]));
console.log('unique', countUnique2([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));
console.log('unique', countUnique2([]));
console.log('unique', countUnique2([-2, -1, -1, 0, 1]));
