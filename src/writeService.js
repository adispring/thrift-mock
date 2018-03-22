const fs = require('fs');
const R = require('ramda');
const shell = require('shelljs');
const prettier = require('prettier');
const { formatExportsTemplate } = require('./utils/writeServiceUtils');

const prettierOptions = {
  trailingComma: 'es5',
  singleQuote: true,
};

const writeService = R.curry(
  (opts, recursiveDeep, topLevelServiceDir, astData) =>
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
            "const { mock } = require('mockjs');\n",
            `const originData = mock(${JSON.stringify(valI.mock, null, 2)});\n`,
            `${realExportsTemplate};`,
          ].join('');

          const result = prettier.format(methodContent, prettierOptions);

          fs.writeFile(methodPath, result, err => {
            if (err) {
              throw err;
            }
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
            R.equals(recursiveDeep, 0) ? serviceDir : topLevelServiceDir
          ),
          R.prop('extendService')
        )
      )(val);
    })(astData)
);

module.exports = writeService;
