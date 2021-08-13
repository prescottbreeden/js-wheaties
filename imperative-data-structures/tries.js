class Trie {
  #pointers;
  #maxSuggestions;
  constructor() {
    this.#pointers = {};
    this.#maxSuggestions = Infinity;
  }

  set maxSuggestions(num) {
    this.#maxSuggestions = num;
  }

  get maxSuggestions() {
    return this.#maxSuggestions;
  }

  insert(newValue) {
    let runner = this.#pointers;
    newValue.split('').forEach((v) => {
      if (runner[v]) {
        runner = runner[v];
      } else {
        runner[v] = {};
        runner = runner[v];
      }
    });
    runner[null] = true;
    return this;
  }

  contains(value) {
    let runner = this.#pointers;
    value.split('').forEach((v) => {
      if (runner[v]) {
        runner = runner[v];
      } else {
        return false;
      }
    });
    return runner.null ? true : false;
  }

  suggestions(prefix) {
    let results = [];
    let runner = this.#pointers;
    prefix.split('').forEach((p) => {
      if (runner[p]) {
        runner = runner[p];
      } else {
        return [];
      }
    });

    const traverse = (node, currentWord = '') => {
      if (!node) return;
      const keys = Object.keys(node);
      if (keys.length) {
        keys.forEach((k) => {
          if (node[k].null && results.length < this.#maxSuggestions) {
            results.push(prefix + currentWord + k);
          }
          traverse(node[k], currentWord + k);
        });
      }
      return results;
    };
    return traverse(runner);
  }
}

const root = new Trie();

[
  'banana',
  'band',
  'bandaid',
  'bane',
  'bank',
  'bandit',
  'bandana',
  'bar',
  'bingo',
  'bin',
].reduce((acc, curr) => acc.insert(curr), root);

// true test cases
console.log('--[true]-------------');
['banana', 'band', 'bandana', 'bar', 'bingo', 'bin'].forEach((word) => {
  console.log(root.contains(word));
});

// false test cases
console.log('--[false]-------------');
['ban', 'bana', 'ba', 'bing', 'b', ''].forEach((word) => {
  console.log(root.contains(word));
});

console.log(root.suggestions('ban'));
