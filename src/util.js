const R = require('ramda');
const getRandomInt = (min, max) => {
  const minI = Math.ceil(min);
  const maxI = Math.floor(max);
  return Math.floor(Math.random() * (maxI - minI + 1)) + minI;
};

const UNMATCHED = { '@@generate/unmatched': true };
const isUnMatched = R.allPass([
  R.complement(R.isNil),
  R.is(Object),
  R.where(UNMATCHED),
]);


module.exports = {
  getRandomInt,
  UNMATCHED,
  isUnMatched,
};
