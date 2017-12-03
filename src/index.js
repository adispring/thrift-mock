const fs = require('fs');
const path = require('path');
const R = require('ramda');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const { CLIEngine } = require('eslint');

const recursiveParser = require('../src/recursiveParser');
const generate = require('../src/generate');

const eslintCli = new CLIEngine({
  fix: true,
  useEslintrc: true,
});

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

const parseAndMock = R.compose(
  recursiveMock(''),
  recursiveParser,
  path.resolve
);

const parseAst = R.compose(
  recursiveParser,
  path.resolve
);

const writeService = R.curry((outpath, astData) => R.forEachObjIndexed((val, key) => {
  rimraf.sync(`${outpath}/${key}`);
  mkdirp.sync(`${outpath}/${key}`);
  R.compose(
    R.forEachObjIndexed((valI, keyI) => {
      const methodPath = `${outpath}/${key}/${keyI}.js`;
      const methodContent = [
        'const { mock } = require(\'mockjs\');\n',
        `const body = mock(${JSON.stringify(valI.mock, null, 2)});\n`,
        'module.exports = { statusCode: 200, body };',
      ].join('');

      const result = eslintCli.executeOnText(methodContent, methodPath);

      fs.writeFile(methodPath, result.results[0].output || methodContent, (err) => {
        if (err) {
          throw err;
        }
      });
    }),
    R.compose(R.defaultTo({}), R.path(['functions']))
  )(val);
})(astData));

const mock = config => R.compose(
  R.map(writeService(config.output.path)),
  R.map(parseAndMock),
  R.path(['service'])
)(config);

module.exports = mock;
module.exports.parseAst = parseAst;
module.exports.parseAndMock = parseAndMock;
