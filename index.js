console.log('running');

// require('./imperative-data-structures/sll');
// require('./imperative-data-structures/bst');
// require('./functional-data-structures/sll');
// require('./functional-data-structures/bst');
// require('./cracking/arrays-strings');
// require('./cracking/linked-lists');

const findMaker = (str, markers) => {
  for(let i = 0; i < markers.length; i++) {
    if (str.includes(markers[i])) {
      return markers[i];
    }
  }
  return undefined;
}

function checkComments(input, markers) {
  const res = input.split(/\n/)
  const balls = res.map((s) => {
    const marker = findMaker(s, markers);
    return marker 
      ? s.split(marker)[0].trim()
      : s;
  }).join('\n')
  return balls;
}
const res = checkComments(
  "apples, plums % and bananas\npears\noranges !applesauce", 
  ["%", "!"], 
)

