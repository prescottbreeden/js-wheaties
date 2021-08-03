// pipe :: (((a, b, …, n) → o), (o → p), …, (x → y), (y → z)) → ((a, b, …, n) → z)
const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, curr) => curr(acc), arg);

// prop :: string -> a -> b | unit
const prop = (property) => (object) => object ? object[property] : object;

// eq :: a -> b -> bool
const eq = (a) => (b) => JSON.stringify(a) === JSON.stringify(b);

const either = (f1, f2) => (arg) => f1(arg) || f2(arg);

// path :: [string] -> a | unit
const path = (propArray) => (object) =>
  propArray.reduce((acc, curr) => prop(curr)(acc), object);

// isNil :: a -> bool
const isNil = either(eq(null), eq(undefined));

// defaultTo :: a -> a | unit -> a
const defaultTo = (def) => (maybe) => isNil(maybe) ? def : maybe;

// ------------------------------------------------------------
// Singly Linked List
// ------------------------------------------------------------

// SLL :: (a, SLL | unit) -> SLL
const SLL = (value, tail = null) => ({
  value,
  tail,
  size: 1 + (tail ? tail.size : 0),
});

// addToFront :: a -> SLL -> SLL
const addToFront = (newValue) => (list) => {
  return SLL(newValue, list);
};

// addToBack :: a -> SLL -> SLL
const addToBack =
  (newValue) =>
  ({ value, tail }) => {
    tail = tail ? addToBack(newValue)(tail) : SLL(newValue);
    return SLL(value, tail);
  };

// getNth :: (number) -> SLL -> a
const getNth =
  (nth, n = 0) =>
  ({ value, tail }) => {
    return n === nth ? value : tail ? getNth(nth, n + 1)(tail) : -1;
  };

// removeDuplicateValues :: SLL -> SLL
const removeDuplicateValues = ({ value, tail }, values = { [value]: true }) => {
  return tail && values[tail.value]
    ? SLL(value, tail.tail ? removeDuplicateValues(tail.tail, values) : null)
    : SLL(
        value,
        tail ? removeDuplicateValues(tail, { ...values, [value]: true }) : null
      );
};

const bob = [
  addToBack(1),
  addToBack(3),
  addToBack(4),
  addToBack(5),
  addToBack(7),
  removeDuplicateValues,
].reduce((acc, curr) => curr(acc), SLL(1));

console.log(bob);

// ------------------------------------------------------------
// Binary Search Tree
// ------------------------------------------------------------

// BST :: (a, BST | unit) -> BST
const BST = (value, left = null, right = null) => ({
  value,
  left,
  right,
  size: 1 + (left ? left.size : 0) + (right ? right.size : 0),
});

// insert :: a -> BST -> BST
const insert =
  (newValue) =>
  ({ value, left, right }) => {
    return newValue < value
      ? BST(value, left ? insert(newValue)(left) : BST(newValue), right)
      : BST(value, left, right ? insert(newValue)(right) : BST(newValue));
  };

// max :: BST -> a
const max = (bst) => (bst.right ? max(bst.right) : bast.value);

// min :: BST -> a
const min = (bst) => (bst.left ? max(bst.left) : bast.value);

// contains :: a -> BST -> bool
const contains = (searchValue) => (bst) => {
  if (!bst) {
    return false;
  } else if (searchValue === bst.value) {
    return true;
  } else if (searchValue < bst.value) {
    return contains(searchValue)(bst.left);
  } else {
    return contains(searchValue)(bst.right);
  }
};

// remove :: a -> BST -> BST
const remove =
  (removeValue) =>
  ({ value, left, right }) => {
    if (removeValue === value) {
      if (left && right) {
        return left.size > right.size
          ? bst(min(right), left, remove(min(right))(right))
          : bst(max(left), remove(max(left))(left), right);
      } else if (!left && !right) {
        return null;
      } else {
        return left || right;
      }
    } else {
      return removeValue < value
        ? BST(value, remove(removeValue)(left), right)
        : BST(value, left, remove(removeValue)(right));
    }
  };

const dingo2 = [
  insert(28),
  insert(2),
  insert(18),
  insert(27),
  insert(55),
  insert(8),
].reduce((acc, curr) => curr(acc), BST(42));

console.log(dingo2);
const dingo3 = remove(28)(dingo2);
