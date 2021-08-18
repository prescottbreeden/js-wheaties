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
  let end = pattern.length - 1; // 2
  let slide = stringSum(text.slice(start, end + 1).split(''));

  while (end < text.length - 1) {
    if (slide === result) return true;
    slide = h(pattern.length - 1)(slide)(text[end + 1])(text[start]);
    start++;
    end++;
  }
  return false;
};

const text = 'thebrownfoxjumpsoverthelazydog';
const pattern = 'foxj';
console.log(rollingHash(pattern, text));
