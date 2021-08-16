const rollingHash = (pattern, text) => {
  const table = text.split('').reduce((acc, curr) => {
    return { ...acc, [curr]: curr.charCodeAt(0) };
  }, {});
  const stringSum = (arr) =>
    arr.reduce(
      (acc, curr, index) =>
        acc + ((table[curr] * 10 ** (arr.length - index - 1)) % 113),
      0
    );
  const result = stringSum(pattern.split(''));
  let start = 0;
  let end = pattern.length - 1;
  let slide = stringSum(['t', 'h', 'e']);
  while (end < text.length) {
    console.log('---------------');
    console.log(text.slice(start, end + 1));
    console.log('slide/result', slide, result);
    // if (slide === result) {
    if (stringSum(text.slice(start, end + 1).split('')) === result) {
      return true;
    }
    slide -= (table[text[start]] * 10 ** (pattern.length - 1)) % 113;
    start++;
    end++;
    slide += (table[text[end]] * 10 ** 0) % 113;
  }
  return false;
};

const text = 'thebrownfoxjumpsoverthelazydog';
const pattern = 'fox';

console.log(rollingHash(pattern, text));
