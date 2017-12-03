const R = require('ramda');
const generate = require('../src/generate');

const recursiveMock = R.curry((ext, ast) => R.compose(
  R.map(
    R.compose(
      R.converge(R.merge, [
        R.ifElse(
          R.has('extends'),
          R.compose(
            ([module, serviceName]) => ({
              extendService: recursiveMock(
                R.join('.', [module, serviceName]),
                ast.include[module]
              ),
            }),
            R.split('.'),
            R.path(['extends'])
          ),
          R.always({})
        ),
        R.evolve({
          functions: R.map(item => R.assoc('mock', generate(ast, item.type), item)),
        }),
      ])
    )
  ),
  R.unless(() => R.isEmpty(ext), R.pick(R.compose(R.of, R.last, R.split('.'))(ext))),
  R.path(['service'])
)(ast));

module.exports = recursiveMock;
