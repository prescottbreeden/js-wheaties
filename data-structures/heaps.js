function curry(fn) {
  return function _curry(...args) {
    return args.length < fn.length
      ? _curry.bind(null, ...args)
      : fn.call(null, ...args);
  };
}

const match = (predMatrix) => (arg) => {
  for (let [p, f] of predMatrix) {
    if (p(arg)) {
      return f(arg);
    }
  }
  throw new Error('Not all cases satisified in match.');
};

const add = (a) => (b) => a + b;
const always = (a) => (_) => a;
const converge = (fn, wraps) => (arg) => fn(...wraps.map((wrap) => wrap(arg)));
const divideBy = (b) => (a) => a / b;
const eq = (a) => (b) => JSON.stringify(a) === JSON.stringify(b);
const gt = curry((a, b) => b > a);
const identity = (a) => a;
const indexOf = curry((val, arr) => arr.indexOf(val));
const lt = curry((a, b) => b < a);
const mult = (a) => (b) => a * b;
const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
const pop = (xs) => xs.pop();
const prop = curry((property, obj) => obj[property]);
const subtractBy = (a) => (b) => b - a;
const takeCompare = curry((c, a, b) => (c(a, b) ? b : a));

// swap :: a -> b -> [a | b] -> unit
const swap = curry((val1, val2, arr) => {
  const idx = indexOf(val1, arr);
  const pidx = indexOf(val2, arr);
  [arr[idx], arr[pidx]] = [arr[pidx], arr[idx]];
});

// parent :: a -> [a] -> a
const parent = curry((value, list) =>
  converge(prop, [
    pipe(indexOf(value), pipe(subtractBy(1), divideBy(2), Math.floor)),
    identity,
  ])(list)
);

// leftChild :: a -> [a] -> a
const leftChild = curry((value, list) =>
  converge(prop, [pipe(indexOf(value), pipe(mult(2), add(1))), identity])(list)
);

// rightChild :: a -> [a] -> a
const rightChild = curry((value, list) =>
  converge(prop, [pipe(indexOf(value), pipe(mult(2), add(2))), identity])(list)
);

class BinaryHeap {
  constructor(type = 'max') {
    this.values = [];
    this.compare = type === 'max' ? gt : lt;
  }

  insert = (newValue) => {
    this.values.push(newValue);
    while (this.compare(parent(newValue, this.values), newValue)) {
      swap(newValue, parent(newValue, this.values))(this.values);
    }
    return this;
  };

  bubbleDown = (values) => {
    const val = values.pop();
    const root = values[0];
    values[0] = val;
    while (
      this.compare(val, leftChild(val, values)) ||
      this.compare(val, rightChild(val, values))
    ) {
      converge(swap, [
        always(val),
        converge(takeCompare, [
          always(this.compare),
          leftChild(val),
          rightChild(val),
        ]),
        identity,
      ])(values);
    }
    return root;
  };

  extractRoot = () => {
    return match([
      [pipe(prop('length'), eq(0)), always(undefined)],
      [pipe(prop('length'), eq(1)), pop],
      [() => true, this.bubbleDown],
    ])(this.values);
  };
}

const min = new BinaryHeap('min');
[99, 70, 65, 44, 45, 40, 53, 100].reduce((acc, curr) => acc.insert(curr), min);
console.log(min.extractRoot());
console.log(min.values);

const max = new BinaryHeap('max');
[99, 70, 65, 44, 45, 40, 53, 100].reduce((acc, curr) => acc.insert(curr), max);
console.log(max.extractRoot());
console.log(max.values);
