// SLL Functor v2
const SLL = (head, tail = null) => ({
  head,
  tail,
  length: 1 + (tail ? tail.length : 0),
  map: (fn) => SLL(fn(head), tail ? tail.map(fn) : tail),
});

const addFront = (newValue) => (sll) => SLL(newValue, sll);
const addBack =
  (newValue) =>
  ({ head, tail }) =>
    SLL(head, tail ? addBack(newValue)(tail) : SLL(newValue));

const removeDupes = ({ head, tail }, values = { [head]: true }) =>
  tail && values[tail.head]
    ? removeDupes(tail, values)
    : SLL(head, tail ? removeDupes(tail, { ...values, [head]: true }) : null);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(
  (acc, curr) => (acc ? addFront(curr)(acc) : SLL(curr)),
  null
);

const data2 = [1, 1, 1, 1, 1, 2]
  .reduce((acc, curr) => (acc ? addBack(curr)(acc) : SLL(curr)), null)
  .map((x) => x * 2)
  .map((x) => x / 2);
console.log(removeDupes(data2));
// console.log(data2.length);
