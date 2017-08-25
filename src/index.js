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

const parseAndMock = R.compose(
  ast => R.map(R.evolve({
    functions: R.map(item => R.assoc('mock', generate(ast, item.type), item)),
  }))(ast.service),
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
