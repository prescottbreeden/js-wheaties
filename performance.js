const performance = func => async arg => {
  const start = Date.now();
  return Promise.resolve(func(arg))
    .then(() => (Date.now() - start)/1000)
    .then((diff) => console.log(diff + "s"))
}

module.exports = {
  performance
}

