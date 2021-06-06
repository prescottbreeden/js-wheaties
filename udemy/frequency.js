const assert = require('assert');
console.log('\n================================\n');

const all = (fn) => (list) => {
  return list.reduce((acc, curr) => {
    return acc ? fn(curr) : false;
  }, true);
};

const eq = (a) => (b) => JSON.stringify(a) === JSON.stringify(b);

const mapHash = (list) => {
  const res = list.reduce((acc, curr) => {
    return acc[curr]
      ? { ...acc, [curr]: acc[curr] + 1 }
      : { ...acc, [curr]: 1 };
  }, {});
  return res;
};

// same :: [number] -> [number] -> boolean
const same = (arr1) => (arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const dict = mapHash(arr2);

  arr1.forEach((number) => {
    if (dict[number * number]) {
      dict[number * number] = dict[number * number] - 1;
    }
  });
  return all(eq(0))(Object.values(dict));
};

assert(same([1, 2, 3])([1, 4, 9]) === true);
assert(same([2, 2, 3])([4, 4, 9]) === true);
assert(same([3, 2, 3])([4, 4, 9]) === false);

const anagram = (str1) => (str2) => {
  if (str1.length !== str2.length) {
    return false;
  }
  const hash = mapHash(str1.split(''));
  str2.split('').forEach((letter) => {
    if (hash[letter]) {
      hash[letter] = hash[letter] - 1;
    }
  });
  return all(eq(0))(Object.values(hash));
};

assert(anagram('')('') === true);
assert(anagram('aaz')('zza') === false);
assert(anagram('anagram')('nagaram') === true);
assert(anagram('rat')('car') === false);
assert(anagram('qwuerty')('qeywrut') === true);
assert(anagram('222')('2223') === false);

console.log('\n All Pass \n');
