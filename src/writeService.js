const fs = require('fs');
const R = require('ramda');
const shell = require('shelljs');
const { CLIEngine } = require('eslint');
const { formatExportsTemplate } = require('./utils/writeServiceUtils');

const eslintCli = new CLIEngine({
  fix: true,
  useEslintrc: true,
});

const writeService = R.curry((opts, recursiveDeep, topLevelServiceDir, astData) =>
  R.forEachObjIndexed((val, key) => {
    const { outpath, exportsTemplate } = opts;
    const serviceDir = `${opts.outpath}/${key}`;
    shell.rm('-rf', serviceDir);
    shell.mkdir('-p', serviceDir);
    const realExportsTemplate = formatExportsTemplate(exportsTemplate);
    R.compose(
      R.forEachObjIndexed((valI, keyI) => {
        const methodPath = `${outpath}/${key}/${keyI}.js`;

        const methodContent = [
          'const { mock } = require(\'mockjs\');\n',
          `const data = mock(${JSON.stringify(valI.mock, null, 2)});\n`,
          `${realExportsTemplate};`,
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
          opts,
          recursiveDeep + 1,
          (R.equals(recursiveDeep, 0) ? serviceDir : topLevelServiceDir)
        ),
        R.prop('extendService')
      )
    )(val);
  })(astData));

module.exports = writeService;
