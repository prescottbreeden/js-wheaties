const { List } = require('immutable-ext');
const assert = require('assert');
const { gt, __, startsWith, length } = require('ramda');

const toUpper = (x) => x.toUpperCase();
const exclaim = (x) => x.concat('!');

const Fn = (run) => ({
  run,
  chain: (f) => Fn((x) => f(run(x)).run(x)),
  map: (f) => Fn((x) => f(run(x))),
  concat: (other) => Fn((x) => run(x).concat(other.run(x))),
});
Fn.of = (x) => Fn(() => x);
Fn.ask = Fn((x) => x);

const bob = Fn(toUpper)
  .concat(Fn(exclaim))
  .map((x) => x.slice(3));

const dingo = Fn(toUpper).chain((x) => Fn((y) => exclaim(y)));

console.log(bob.run('dingo'));
console.log(dingo.run('dingo'));

let res;
res = Fn.of('hello')
  .map(toUpper)
  .chain((upper) => Fn.ask.map((config) => [upper, config]));

console.log(
  res.run({ db: 'db-connection', strategy: 'storm the castle', port: 30000 })
);

const Endo = (run) => ({
  run,
  concat: (other) => Endo((x) => run(other.run(x))),
});
Endo.empty = () => Endo((x) => x);

res = List([toUpper, exclaim]).foldMap(Endo, Endo.empty()).run('dingo');

console.log(res);

// (acc, a) -> acc
// (a, acc) -> acc
// a -> (acc -> acc)
// a -> Endo(acc -> acc)

// Fn(a -> Endo(acc -> acc))
const Reducer = (run) => ({
  run,
  contramap: (f) => Reducer((acc, x) => run(acc, f(x))),
  concat: (other) => Reducer((acc, x) => other.run(run(acc, x), x)),
});

// Reduxy state example
// ====================
const checkCreds = (email, pass) => email === 'admin' && pass === 123;

const login = (state, payload) =>
  payload.email
    ? Object.assign({}, state, {
        loggedIn: checkCreds(payload.email, payload.pass),
      })
    : state;

const setPrefs = (state, payload) =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state;

const reducer = Reducer(login).concat(Reducer(setPrefs));

const state = { loggedIn: false, prefs: {} };
const payload = {
  email: 'admin',
  pass: 123,
  prefs: {
    theme: 'dark',
  },
};
console.log(reducer.run(state, payload));

//------------------------------------------------------------------------------

const classToClassName = (html) => html.replace(/class\=/gi, 'className=');
const updateStyleTag = (html) => html.replace(/style="(.*)"/gi, 'style={{$1}}');
const htmlFor = (html) => html.replace(/for\=/gi, 'htmlFor=');

const template = `
<div class="form-group">
  <label for="name">Name</label>
  <input type="text" class="form-control" id="name" name="name" />
`;

let ex1;

ex1 = (html) =>
  Endo(htmlFor)
    .concat(Endo(updateStyleTag))
    .concat(Endo(classToClassName))
    .run(html);

console.log(ex1(template));

ex1 = (html) =>
  List.of(htmlFor, updateStyleTag, classToClassName)
    .foldMap(Endo, Endo.empty())
    .run(html);

console.log(ex1(template));

// Ex2: Predicate
// ============

const Pred = (run) => ({
  run,
  contramap: (f) => Pred((x) => run(f(x))),
  concat: (other) => Pred((x) => run(x) && other.run(x)),
});

const graterThan3 = gt(__, 3);
const startsWithS = startsWith('s');

const p = Pred(graterThan3).contramap(length).concat(Pred(startsWithS));

const result = ['sad', 'sally', 'sipped', 'the', 'soup'].filter(p.run);
assert.deepEqual(result, ['sally', 'sipped', 'soup']);

// Ex3: MatchesAny
// ==============

const extension = (file) => file.name.split('.').pop();

const matchesAny = (regex) => (str) => str.match(new RegExp(regex), 'ig');

const matchesAnyP = (pattern) => Pred(matchesAny(pattern));

let ex3;

ex3 = (file) =>
  matchesAny('txt|md')(extension(file)) &&
  matchesAny('functional')(file.contents);

const files = [
  { name: 'blah.dll', contents: '2138x8d7ap1,3rjasd8uwenDzvlxcvkc' },
  { name: 'intro.txt', contents: 'Welcome to functional programming class' },
  { name: 'lesson.md', contents: 'We will learn abotu monoids!' },
];

console.log(files.filter(ex3));

ex3 = (file) =>
  matchesAnyP('txt|md')
    .contramap(extension)
    .concat(matchesAnyP('functional').contramap((f) => f.contents))
    .run(file);

console.log(files.filter(ex3));
