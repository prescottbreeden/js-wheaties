const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
const add = (a) => (b) => a + b;
const subtractFrom = (a) => (b) => a - b;
const subtractBy = (a) => (b) => b - a;
const mod = (a) => (b) => b % a;
const pow2 = (a) => (b) => b ** a;
const pow = (a) => (b) => a ** b;
const mult = (a) => (b) => a * b;
const hash = (a) => a.charCodeAt(0);

const positionValue = (p) => (char) => pipe(hash, mult(pow(10)(p)))(char);

const stringSum = (arr) =>
  arr.reduce(
    (acc, curr, index) =>
      pipe(positionValue(arr.length - index - 1), add(acc))(curr),
    0
  );

const h = (length) => (slide) => (end) => (start) =>
  pipe(
    positionValue(length),
    subtractFrom(slide),
    mult(10),
    add(hash(end))
  )(start);

const rollingHash = (pattern, text) => {
  const result = stringSum(pattern.split(''));
  let start = 0;
  let slide = stringSum(text.slice(start, pattern.length).split(''));

  while (start <= text.length - pattern.length) {
    if (slide === result) return true;
    slide = h(pattern.length - 1)(slide)(text[start + pattern.length])(
      text[start]
    );
    start++;
  }
  return false;
};

const countSubstrings = (pattern, text) => {
  const result = stringSum(pattern.split(''));
  let start = 0;
  let slide = stringSum(text.slice(start, pattern.length).split(''));
  let count = 0;

  // this breaks if <= because of out of bounds...
  while (start < text.length - pattern.length) {
    if (slide === result) {
      count++;
    }
    slide = h(pattern.length - 1)(slide)(text[start + pattern.length])(
      text[start]
    );
    start++;
  }
  return count;
};

const text = 'thebrownfoxjumpsoverthelazydog';
const pattern = 'dog';
console.log(rollingHash(pattern, text));
console.log(countSubstrings(pattern, text));
