const { List } = require('immutable-ext');

// Exercise 1: reimplement sum using foldMap and the Sum Monoid
// ==============================================================
// sum :: (Foldable f, Monoid m) => f m -> m

const Sum = (x) => ({
  x,
  concat: (other) => Sum(x + other.x),
  inspect: () => `Sum(${x})`,
});
Sum.empty = () => Sum(0);

// var sum = xs => List(xs).reduce((acc, x) => acc + x, 0);

var sum = (xs) => List(xs).foldMap(Sum, Sum.empty());
console.log(sum([1, 2, 3]));

sum = (xs) => List(xs).map(Sum).fold(Sum.empty());
console.log(sum([1, 2, 3]));

// Exercise 2: reimplement lessThanZero using foldMap and the Any Monoid
// ==============================================================
// Any :: (Foldable f, Monoid m) => f m -> m

const Any = (x) => ({
  x,
  concat: (other) => Any(x || other.x),
  inspect: () => `Any(${x})`,
});
Any.empty = () => Any(false);

var lessThanZero = (xs) => List(xs).reduce((acc, x) => acc || x < 0, false);
console.log(lessThanZero([1, 2, 3]));
console.log(lessThanZero([-1, 2, 3]));

lessThanZero = (xs) => List(xs).foldMap((x) => Any(x < 0), Any.empty());
console.log(lessThanZero([1, 2, 3]));
console.log(lessThanZero([-1, 2, 3]));

lessThanZero = (xs) =>
  List(xs)
    .map((x) => Any(x < 0))
    .fold(Any.empty());
console.log(lessThanZero([1, 2, 3]));
console.log(lessThanZero([-1, 2, 3]));

// Exercise 3: reimplement max using foldMap and the Max Monoid
// ==============================================================
// Max :: (Foldable f, Monoid m) => f m -> m

const Max = (x) => ({
  x,
  concat: (other) => Max(Math.max(x, other.x)),
  inspect: () => `Max(${x})`,
});
Max.empty = () => Max(-Infinity);

var max = (xs) => List(xs).foldMap(Max, Max.empty());
console.log(max([1, 2, 3]));
console.log(max([1, -2, -3]));

// Exercise 4: create Tuple
// ==============================================================
// Tuple :: (Foldable f, Monoid m) => f m -> m

const Tuple = (_1, _2) => ({
  _1,
  _2,
  concat: (other) => Tuple(_1.concat(other._1), _2.concat(other.b)),
  inspect: () => `Tuple(${a}, ${b})`,
});

console.log(Tuple(sum([1, 28, 42]), sum([1, 2, 3])));
