const isUnique = (string) => {
  console.log(new Set(string));
  return new Set(string).size === string.length;
};

// console.log(isUnique('orange'));
// console.log(isUnique('apple'));

const letterCount = (string) =>
  string.split('').reduce((acc, curr) => {
    return acc[curr]
      ? { ...acc, [curr]: acc[curr] + 1 }
      : { ...acc, [curr]: 1 };
  }, {});

const s1 = letterCount('apple');
const s2 = letterCount('plea');
const result = Object.keys(s1).reduce((acc, curr) => {
  return acc ? s1[curr] === s2[curr] : acc;
}, true);

const urlify = (url) => url.replace(/(\s+)(\w)/g, '%20$2');

const palindromPermutation = (string) => {
  const odds = Object.values(letterCount(string.toLowerCase())).filter(
    (num) => num % 2 !== 0
  );
  return string.length % 2 === 0
    ? odds.length === 0 || odds.length === 2
    : odds.length === 1;
};

const oneAway = (string1, string2) => {
  const result =
    string1.length > string2.length
      ? string1.split('').filter((letter) => string2.indexOf(letter) === -1)
      : string2.split('').filter((letter) => string1.indexOf(letter) === -1);
  return result.length <= 1;
};

const stringCompression = (string) => {
  const res = string.split('').reduce(
    (acc, curr) => {
      if (acc.current.length === 0) {
        return { ...acc, current: curr, count: 1 };
      }
      if (acc.current == curr) {
        return { ...acc, count: acc.count + 1 };
      } else {
        return {
          result: acc.result + acc.current + acc.count.toString(),
          current: curr,
          count: 1,
        };
      }
    },
    { current: '', count: 0, result: '' }
  );
  return res.result + res.current + res.count;
};

const rotateMatrix = (matrix) => {
  return matrix.map((row, rIndex) => {
    return row.map((_, cIndex) => {
      const y = matrix.length - 1 - cIndex;
      const x = rIndex;
      return matrix[y][x];
    });
  });
};

const zeroMatrix = (matrix) => {
  matrix.map((row) => {
    return row.map((col) => {
      return col === 0;
    });
  });
};
