const { assert } = require('../assert');
const R = require('ramda');

// ============================================================================
// 1.1 is unique
// ============================================================================
// Implement an algorithm to determin if a string has all unique characters.
// What if you cannot use additional data structures?
//
const isUniqueMemo = string => {
  const letters = {};
  return string
    .split('')
    .reduce((acc, curr) => {
      if (acc === false || letters[curr]) {
        return false;
      } else {
        letters[curr] = true;
        return acc;
      }
    }, true)
}

const isUniqueNoMemo = string => {
  return string.split('').reduce((acc, curr) => {
    return acc === false
      ? acc
      : filtered = string.split('').filter(str => str === curr).length <= 1;
  }, true)
}

// ============================================================================
// 1.2 check permutation
// ============================================================================
// Given two strings, write a method to decide if one is a permutation of the
// other.

// mapLetters :: string -> obj
const mapLetters = string => {
  return string
    .split('')
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: acc[curr] ? acc[curr] + 1 : 1
      }
    }, {});
};

// isPermutation :: (string, string) -> boolean
const isPermutation = (string1, string2) => {
  const dict1 = mapLetters(string1);
  const dict2 = mapLetters(string2);
  return Object.keys(dict1).reduce((acc, curr) => {
    return acc
      ? dict2[curr] === dict1[curr]
      : acc;
  }, true)
};

// ============================================================================
// 1.3 urlify
// ============================================================================
// Write a method to replace all spaces in a string with '%20'. You may assume 
// that the string has sufficient space at the end to hold the additional chars
// and that you are given the "true" length of the string.
// Example
// Input: "Mr Jogn Smith     ", 13
// Output: "Mr%20John%20Smith"

// urlify :: string -> string
const urlify = string => string.replace(/\s+/g, '%20');

// ============================================================================
// 1.4 palindorome permutation
// ============================================================================
// Given a string, write a function to check it if is a permutation of a palindorome.
// Does not need to be limited to dictionary words. Ignore casing and non-letter chars.
// Example
// Input: "Tract Coa"
// Output: True (permutations: "taco cat", "atco cta", etc.)

// isPalindrome :: string -> boolean
const isPalindrome = string => {
  const test = string
    .split('')
    .reverse()
    .join('');
  return test === string;
}

// swap :: (string, int, int) -> string
const swap = (string, pos1, pos2) => {
  const arr = [...string.split('')];
  const temp = string[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
  return arr.join('');
}

// permuteString :: (string, int, int, obj) -> [string]
const permuteString = (
  string,
  lowerBound = 0,
  upperBound = string.length - 1,
  memo = {}
) => {
  if (lowerBound === upperBound || memo[string]) {
    return [undefined];
  }
  let words = [];
  for (let i = lowerBound; i <= upperBound; i++) {
    const swapString = swap(string, lowerBound, i);
    const permutations = permuteString(
      swapString,
      lowerBound + 1,
      upperBound,
      memo
    );
    memo = { ...memo, [swapString]: true };
    words = [...words, swapString, ...permutations];
  }
  return words;
}

// allPermutations :: string -> [string]
const allPermutations = string => {
  const removeSpaces = string.replace(/\s+/g, '');
  const allPermuteStringResults = permuteString(removeSpaces)
    .filter(x => x !== undefined);
  const noDupes = allPermuteStringResults.reduce((acc, curr) => ({
    ...acc,
    [curr]: curr
  }), {});
  return Object.keys(noDupes);
}

// allPalindromes :: string -> [string]
const allPalindromes = string => {
  const perms = allPermutations(string);
  return perms
    .reduce((acc, curr) => {
      if (isPalindrome(curr)) {
        return [ ...acc, curr ];
      }
      return acc;
    }, []);
}

// ============================================================================
// 1.5 one away
// ============================================================================
// There are three types of edits that can be performed on strings: insert a char,
// remove a char, replace a char. Given two strings, write a function to check 
// if they are one edit (or zero edits) away.
// Example
// pale, ple -> true
// pales, pale -> true
// pale, bale -> true
// pale, bake -> false

// oneAway :: (string1, string2) -> boolean
const oneAway = (string1, string2) => {
  const diffs = string1.split('').reduce((acc, curr) => {
    if (string2.includes(curr)) {
      return acc;
    }
    return acc += curr;
  }, '');
  return diffs.length === 1;
}

// ============================================================================
// 1.6 string compression
// ============================================================================
// Implement a method to perform basic string compression using the counts of 
// repeated characters. For example, the string aabcccccaaa would become a2b1c5a3.
// If the compressed string would not become smaller than the original string, 
// return the original string. Can assume string has only [A-Z][a-z].

// stringCompressionMemo :: string -> obj
const stringCompressionMemo = string => ({
  result: '',
  memo: {
    letter: string[0],
    num: 0
  }
});

// generateCompression :: accumulator -> string
const generateCompressionString = R.converge(
  R.concat, [
    R.compose(
      R.prop('letter'),
      R.prop('memo'),
    ),
    R.compose(
      R.ifElse(
        R.equals(0),
        R.always(''),
        R.toString
      ),
      R.prop('num'),
      R.prop('memo'),
    ),
  ]
);

// incrementLetter :: accumulator -> accumulator
const incrementLetter = accumulator => ({
  ...accumulator,
  memo: {
    ...accumulator.memo,
    num: accumulator.memo.num + 1,
  }
});

// terminateWithRepeatedLetter :: accumulator -> accumulator
// updates the count and updates result
const terminateWithRepeatedLetter = acc => R.compose(
  (x) => ({ ...acc, result: acc.result += x }),
  generateCompressionString,
  incrementLetter,
)(acc);

// terminateWithNonRepeatedLetter :: accumulator -> accumulator
// updates the result by concatenating the final letter
const terminateWithNonRepeatedLetter = (acc, curr) => ({
  ...acc,
  result: acc.result += generateCompressionString(acc) + curr
});

// updateResult :: accumulator -> accumulator
// updates the result and switches to new letter
const updateResult = (acc, curr) => ({
  result: acc.result += generateCompressionString(acc),
  memo: { letter: curr, num: 1 },
});

// isRepeatedLetter :: (accumulator, string) -> boolean
const isRepeatedLetter = (acc, curr) => acc.memo.letter === curr;

// isLastLetter :: (string, int) -> boolean
const isLastLetter = (string, index) => index === string.length - 1;

// compressionReducer :: string -> (accumulator, current, index) -> accumulator
const compressionReducer = string => (acc, curr, index) => {
  if (isLastLetter(string, index)) {
    return isRepeatedLetter(acc, curr)
      ? terminateWithRepeatedLetter(acc)
      : terminateWithNonRepeatedLetter(acc, curr);
  }
  return isRepeatedLetter(acc, curr)
    ? incrementLetter(acc)
    : updateResult(acc, curr);
}

// stringCompression :: string -> obj
const stringCompression = string => {
  const compression = string
    .split('')
    .reduce(
      compressionReducer(string),
      stringCompressionMemo(string)
    );
  return compression.result;
}


// ============================================================================
// 1.7 rotate matrix
// ============================================================================
// Given an image represented by an N x N matrix, where each pixel in the image is
// represented by an integer, write a method to rotate the image by 90 degrees.
// Can you do this in place?
// example
// 1 2 3 >> 7 4 1
// 4 5 6 >> 8 5 2
// 7 8 9 >> 9 6 3

const rotateMatrix = matrix => {
  const newMatrix = [];
  const N = matrix.length;
  for (let row = 0; row < N; row++) {
    newMatrix.push([]);
    for (let col = 0; col < N; col++) {
      const pos = N - 1 - col;
      newMatrix[row].push(matrix[pos][row]);
    }
  }
  return newMatrix;
}

// this is just array math masturbation...
const rotateMatrixInplace = matrix => {
  const N = matrix.length;
  for (let row = 0; row < N / 2; row++) {
    for (let col = row; col < N - row - 1; col++) {
      const temp = matrix[row][col];
      matrix[row][col] = matrix[N - 1 - col][row];
      matrix[N - 1 - col][row] = matrix[N - 1 - row][N - 1 - col];
      matrix[N - 1 - row][N - 1 - col] = matrix[col][N - 1 - row];
      matrix[col][N - 1 - row] = temp;
    }
  }
  return matrix;
}

// ============================================================================
// 1.8 zero matrix
// ============================================================================
// Write an algorithm such that if an element in an M X N matrix is 0, its entire
// row and column are set to 0.

// zeroRowsColsOfMatrix :: ([[int]], [int], [int]) -> [[int]]
const zeroRowsColsOfMatrix = (matrix, zcol, zrow) => {
  const newMatrix = [];
  const N = matrix.length;
  for (let row = 0; row < N; row++) {
    newMatrix.push([]);
    for (let col = 0; col < N; col++) {
      if (zcol.includes(col) || zrow.includes(row)) {
        newMatrix[row].push(0);
      } else {
        newMatrix[row].push(matrix[row][col]);
      }
    }
  }
  return newMatrix;
}
// zeroMatrix :: [[int]] -> [[int]]
const zeroMatrix = matrix => {
  const N = matrix.length;
  let zcol = [];
  let zrow = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (matrix[row][col] === 0) {
        zcol = [...zcol, col];
        zrow = [...zrow, row];
      }
    }
  }
  return (zcol.length || zrow.length)
    ?  zeroRowsColsOfMatrix(matrix, zcol, zrow)
    : matrix;
}


// ============================================================================
// 1.9 string rotation
// ============================================================================
// Assume you have a method isSubstring which checks if one word is a substring of
// another. Given two strings, s1 and s2, write code to check if s2 is a rotation
// of s1 using only one call to isSubstring (e.g. "waterbootle" is a rotation of 
// "erbottlewat")

// rotateString :: string -> [string]
const rotateString = string => {
  let words = [];
  for(let idx = 0; idx < string.length; idx++) {
    let word = string[idx];
    let i = (idx + 1) % string.length;
    while(i != idx) {
      word += string[i];
      i++;
      i = i % string.length;
    }
    words.push(word);
  }
  return words;
}

// isSubstring :: (string, string) -> boolean
const isSubstring = (string1, string2) => {
  const rotations = rotateString(string1);
  return rotations.includes(string2);
}

// ============================================================================
//  Test Cases
// ============================================================================

// --[ isUniqueMemo ]----------------------------------------------------------
assert(
  "It returns true if all letters are unique",
  isUniqueMemo('abcde'),
  true
);
assert(
  "It returns false if all letters are not unique",
  isUniqueMemo('abbcde'),
  false
);
// --[ isUniqueNoMemo ]--------------------------------------------------------
assert(
  "It returns true if all letters are unique",
  isUniqueNoMemo('abcde'),
  true
);
assert(
  "It returns false if all letters are not unique",
  isUniqueNoMemo('abbcde'),
  false
);
// --[ isPermutation ]---------------------------------------------------------
assert(
  "It returns true if strings contain same number of letters",
  isPermutation('cata', 'taca'),
  true
);
assert(
  "It returns false if strings contain different number of letters",
  isPermutation('cata', 'tacaa'),
  false
);
// --[ urlify ]----------------------------------------------------------------
assert(
  "It removes all spaces and replaces with %20",
  urlify("dingo ate    my semicolon"),
  "dingo%20ate%20my%20semicolon"
);
// --[ isPalindrome ]----------------------------------------------------------
assert(
  "returns true if palindrome is possible",
  isPalindrome("racecar"),
  true
);
assert(
  "returns false if palindrome is not possible",
  isPalindrome("raceecart"),
  false
);
// --[ allPalindromes ]--------------------------------------------------------
assert(
  "returns all palindromes",
  allPalindromes('boob'),
  ['boob', 'obbo']
);
// --[ oneAway ]---------------------------------------------------------------
assert(
  "pale, ple returns true",
  oneAway('pale', 'ple'),
  true
);
assert(
  "pales, pale returns true",
  oneAway('pales', 'pale'),
  true
);
assert(
  "bale, pale returns true",
  oneAway('bale', 'pale'),
  true
);
assert(
  "pale, ple returns true",
  oneAway('pale', 'bake'),
  false
);
// --[ isSubstring ]-----------------------------------------------------------
assert(
  "returns true if second string is a rotation of the first",
  isSubstring('dingo', 'ngodi'),
  true
);
assert(
  "returns false if second string is not a rotation of the first",
  isSubstring('dingo', 'ngoid'),
  false
);
// --[ stringCompressionMemo ]-------------------------------------------------
assert(
  "generates a valid compression memo schema",
  JSON.stringify(stringCompressionMemo("dingo")),
  JSON.stringify({
    result: '',
    memo: {
      letter: 'd',
      num: 0
    }
  })
);
// --[ stringCompression ]-----------------------------------------------------
assert(
  "generates a compression result of a2b1c5a3",
  stringCompression("aabcccccaaa"),
  "a2b1c5a3"
);
assert(
  "generates a compression result of a2b1c5a2p",
  stringCompression("aabcccccaap"),
  "a2b1c5a2p"
);
// --[ rotate matrix ] --------------------------------------------------------
const testDataRotateMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
assert(
  "Rotates matrix with new matrix numbers in correct position.",
  R.equals(rotateMatrix(
    testDataRotateMatrix),
    [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
  ),
  true
);
assert(
  "Rotates matrix and produces new matrix.",
  R.equals(rotateMatrix(testDataRotateMatrix), testDataRotateMatrix),
  false,
);
assert(
  "Rotates matrix in place with new matrix numbers in correct position.",
  R.equals(
    rotateMatrixInplace(testDataRotateMatrix),
    [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
  ),
  true
);
assert(
  "Rotates matrix in place.",
  R.equals(rotateMatrixInplace(testDataRotateMatrix), testDataRotateMatrix),
  true
);
// --[ zero matrix ] --------------------------------------------------------
const testDataZeroMatrix = [
  [0, 2, 3],
  [4, 0, 6],
  [7, 8, 0],
];
assert(
  "Replaces all cols and rows with 0s with all 0s.",
  R.equals(zeroMatrix(
    testDataZeroMatrix),
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  ),
  true
);
assert(
  "Rotates matrix and produces new matrix.",
  R.equals(zeroMatrix(testDataZeroMatrix), testDataZeroMatrix),
  false,
);


console.log("all test cases passed");
