const { assert } = require('../assert');
// 1.1 is unique
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

const isUniqueNoMemo = string => {
  return string.split('').reduce((acc, curr) => {
    return acc === false
      ? acc
      : filtered = string.split('').filter(str => str === curr).length <= 1;
  }, true)
}
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

// 1.2 check permutation
// Given two strings, write a method to decide if one is a permutation of the
// other.
// helper
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
const isPermutation = (string1, string2) => {
  const dict1 = mapLetters(string1);
  const dict2 = mapLetters(string2);
  return Object.keys(dict1).reduce((acc, curr) => {
    return acc
      ? dict2[curr] === dict1[curr]
      : acc;
  }, true)
};
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


// 1.3 urlify
// Write a method to replace all spaces in a string with '%20'. You may assume 
// that the string has sufficient space at the end to hold the additional chars
// and that you are given the "true" length of the string.
// Example
// Input: "Mr Jogn Smith     ", 13
// Output: "Mr%20John%20Smith"

// 1.4 palindorome permutation
// Given a string, write a function to check it if is a permutation of a palindorome.
// Does not need to be limited to dictionary words. Ignore casing and non-letter chars.
// Example
// Input: "Tract Coa"
// Output: True (permutations: "taco cat", "atco cta", etc.)

// 1.5 one away
// There are three types of edits that can be performed on strings: insert a char,
// remove a char, replace a char. Given two strings, write a function to check 
// if they are one edit (or zero edits) away.
// Example
// pale, ple -> true
// pales, pale -> true
// pale, bale -> true
// pale, bake -> false

// 1.6 string compression
// Implement a method to perform basic string compression using the counts of 
// repeated characters. For example, the string aabcccccaaa would become a2b1c5a3.
// If the compressed string would not become smaller than the original string, 
// return the original string. Can assume string has only [A-Z][a-z].

// 1.7 rotate matrix
// Given an image represented by an N x N matrix, where each pixel in the image is
// represented by an integer, write a method to rotate the image by 90 degrees.
// Can you do this in place?

// 1.8 zero matrix
// Write an algorithm such that if an element in an M X N matrix is 0, its entire
// row and column are set to 0.

// 1.9 string rotation
// Assume you have a method isSubstring which checks if one word is a substring of
// another. Given two strings, s1 and s2, write code to check if s2 is a rotation
// of s1 using only one call to isSubstring (e.g. "waterbootle" is a rotation of 
// "erbottlewat")

console.log("all cases passed");
