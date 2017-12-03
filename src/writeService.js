const fs = require('fs');
const R = require('ramda');
const shell = require('shelljs');
const { CLIEngine } = require('eslint');

const eslintCli = new CLIEngine({
  fix: true,
  useEslintrc: true,
});

const writeService = R.curry((outpath, astData) => R.forEachObjIndexed((val, key) => {
  const serviceDir = `${outpath}/${key}`;
  shell.rm('-rf', serviceDir);
  shell.mkdir('-p', serviceDir);
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

module.export = writeService;
