const fs = require('fs');
const R = require('ramda');
const shell = require('shelljs');
const { CLIEngine } = require('eslint');

const eslintCli = new CLIEngine({
  fix: true,
  useEslintrc: true,
});

const writeService = R.curry((outpath, recursiveDeep, topLevelServiceDir, astData) =>
  R.forEachObjIndexed((val, key) => {
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
          /* shell.exec(`eslint --fix ${methodPath}`, { async: true });*/
          if (recursiveDeep > 0) {
            shell.ln('-sf', methodPath, `${topLevelServiceDir}/${keyI}.js`);
          }
        });
      }),
      R.compose(R.defaultTo({}), R.path(['functions']))
    )(val);
    R.when(
      R.has('extendService'),
      R.compose(
        writeService(
          outpath,
          recursiveDeep + 1,
          (R.equals(recursiveDeep, 0) ? serviceDir : topLevelServiceDir)
        ),
        R.prop('extendService')
      )
    )(val);
  })(astData));

module.exports = writeService;
