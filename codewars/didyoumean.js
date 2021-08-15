function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = function (term) {
  const result = this.words.reduce(
    (acc, curr) => {
      const { a, b } =
        curr.length > term.length ? { a: curr, b: term } : { a: term, b: curr };
      let edits = 0;
      let i = 0;
      for (i; i < b.length; i++) {
        if (a[i] === b[i]) {
          continue;
        } else if (a[i + 1] === b[i]) {
          edits++;
          i++;
        } else {
          edits++;
        }
      }
      edits += a.length - i;
      return edits < acc.edits ? { word: curr, edits } : acc;
    },
    { word: '', edits: Infinity }
  );
  return result.word;
};

// const languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
// console.log(languages.findMostSimilar("heaven"));

const languages = [
  'javascript',
  'java',
  'ruby',
  'php',
  'python',
  'coffeescript',
];
const text2Binary = (char) => Number(char.charCodeAt(0).toString(2));
const binaryWords = languages.map(text2Binary);

class Node {
  constructor(value, key = text2Binary(value), left = null, right = null) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class DST {
  constructor() {
    this.root = null;
  }

  insert(newValue) {
    const node = new Node(newValue);
    let runner = this.root;
    if (!runner) {
      this.root = node;
    }
    while (runner) {
      if (node.key < runner.key) {
        if (!runner.left) {
          runner.left = node;
          return this;
        } else {
          runner = runner.left;
        }
      } else if (node.key > runner.key) {
        if (!runner.right) {
          runner.right = node;
          return this;
        } else {
          runner = runner.right;
        }
      } else {
        break;
      }
    }
  }
}

const dst = new DST();

languages.forEach((language) => {
  language.split('').reduce((acc, curr) => {
    acc.insert(curr);
    return acc;
  }, dst);
});

console.log(dst);

