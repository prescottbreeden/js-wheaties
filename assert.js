const { equals } = require('ramda');
const assert = (msg, val1, val2) => {
  if (equals(val1, val2)) {
    return true;
  }
  throw new Error(`${msg} failed`);
}

module.exports = {
  assert
}
