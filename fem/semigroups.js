const { List } = require('immutable-ext');

// Monoids
// Semi-group

// closed
// 1 + 2 + 6
// 1 + (2 + 6)
// (1 + 2) + 6

// not closed
// 10 / 4 / 2
// 10 / (4 / 2) -> 5
// (10 / 4) / 2 -> 1.25?

// closed + associative = parallel

// Moind = SemiGroup + Identity
// <*> :: Monoid m => (a -> m) -> (a -> m) -> a -> m

const Sum = (x) => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});
Sum.empty = () => Sum(0);

const Product = (x) => ({
  x,
  concat: ({ x: y }) => Product(x * y),
  inspect: () => `Product(${x})`,
});
Product.empty = () => Product(1);

const Any = (x) => ({
  x,
  concat: ({ x: y }) => Any(x || y),
  inspect: () => `Any(${x})`,
});
Any.empty = () => Any(false);

const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`,
});
All.empty = () => All(true);

const res = Sum(3).concat(Sum(4)).concat(Sum(5));
console.log(res);

const res2 = Product(3).concat(Product(4)).concat(Product(5));
console.log(res2);

const res3 = Any(true).concat(Any(false)).concat(Any(true));
console.log(res3);

const res4 = Any(true).concat(Any(true)).concat(Any(true));
console.log(res4);

const res5 = 'hi'.concat(' there').concat('!');
console.log(res5);

const list = [1, 2, 3, 4, 5].reduce(
  (acc, x) => acc.concat(Sum(x)),
  Sum.empty()
);
console.log(list);
const badList = [].map(Sum).reduce((acc, x) => acc.concat(x), Sum.empty());
console.log(badList);

const jazz = List([true, false]).foldMap(Any, Any.empty());
const jazz2 = List([true, false]).foldMap(All, All.empty());
console.log(jazz);
console.log(jazz2);

// has no empty, only a semigroup, not a monoid
const Intersection = (x) => ({
  x,
  concat: ({ x: y }) => Intersection(x.filter((z) => y.includes(z))),
  inspect: () => `Intersection(${x})`,
});

// has an empty, therefore monoid
const Union = (x) => ({
  x,
  concat: ({ x: y }) => Union(x.concat(y.filter((z) => !x.includes(z)))),
  inspect: () => `Union(${x})`,
});
Union.empty = () => Union([]);
