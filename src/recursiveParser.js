const fs = require('fs');
const path = require('path');
const R = require('ramda');
const parser = require('thrift-parser');

// input: absolute filepath
const recursiveParser = filepath => R.compose(
  R.unless(
    R.where({ include: R.anyPass([R.isNil, R.isEmpty]) }),
    R.evolve({
      include: R.map(
        R.converge(R.merge, [
          R.identity,
          R.compose(
            recursiveParser,
            includePath => path.resolve(path.dirname(filepath), includePath),
            R.prop('path')
          ),
        ])
      ),
    })
  ),
  parser,
  fs.readFileSync
)(filepath);

module.exports = recursiveParser;
