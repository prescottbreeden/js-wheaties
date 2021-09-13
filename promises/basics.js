const createState = (schema) => {
  return Object.keys(schema).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: {
        errors: '',
        isValid: true,
      },
    };
  }, {});
};

const schema = {
  name: [
    {
      error: 'Cannot have spaces.',
      validation: ({ name }) => !name.includes(' '),
    },
    {
      error: 'Cannot be dingo.',
      asyncValidation: async ({ name }) =>
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(name !== 'dingo');
          })
        ),
    },
  ],
};

const state = createState(schema);

const updateState = async (v, value) => {
  const { asyncValidation, validation, error } = v;
  if (asyncValidation) {
    const errors = await asyncValidation(value);
    return errors ? '' : error;
  } else {
    const errors = validation(value);
    return errors ? '' : error;
  }
};

const validate = async (key, value) => {
  let errors = [];
  for (const v of schema[key]) {
    const error = await updateState(v, value);
    if (error) {
      errors.push(error);
    }
  }
  return {
    [key]: {
      errors,
      isValid: Boolean(!errors.length),
    },
  };
};

(async () => {
  const newState = await validate('name', { name: 'dingo' });
  console.log('newState', newState);
})();
// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise3, promise2, promise1]).then((v) => console.log(v));
