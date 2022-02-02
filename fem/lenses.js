const { toUpper, view, over, lensProp, compose, map } = require('ramda');
const { List } = require('immutable-ext');

const L = {
  name: lensProp('name'),
  street: lensProp('street'),
  address: lensProp('address'),
};

const user = { address: { street: { name: 'Maple' } } };

const addrStreetName = compose(L.address, L.street, L.name);

let res;
res = over(addrStreetName, toUpper, user); // 'Maple'
res = view(addrStreetName, user);
console.log('result', res);

const validationState = {
  name: {
    valid: true,
    message: '',
  },
};

const validations = {
  name: [
    {
      error: 'name must be at least 3 characters',
      validate: ({ name }) => name.length >= 3,
    },
    {
      error: 'name must be less than 10 characters',
      validate: ({ name }) => name.length <= 10,
    },
    {
      error: 'name must be alphanumeric',
      validate: ({ name }) => /^[a-z0-9]+$/i.test(name),
    },
  ],
};

// put state in ask?
const validate = (prop) => (value) => {
  const v = lensProp(prop);
  const state = over(
    v,
    compose((x) => x.map((x) => x.validate(value))),
    validations
  );
  console.log(state);
};

validate('name')({ name: 'ding-0' });
