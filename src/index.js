const path = require('path');
const R = require('ramda');

const recursiveParser = require('./recursiveParser');
const recursiveMock = require('./recursiveMock');
const writeService = require('./writeService');

const parseAst = R.compose(recursiveParser, path.resolve);

const parseAndMock = R.compose(
  recursiveMock(''),
  recursiveParser,
  path.resolve
);

const mock = config =>
  R.compose(
    R.map(
      writeService(
        {
          outpath: config.output.path,
          exportsTemplate: config.exportsTemplate,
        },
        0,
        ''
      )
    ),
    R.map(parseAndMock),
    R.path(['service'])
  )(config);

module.exports = mock;
module.exports.parseAst = parseAst;
module.exports.parseAndMock = parseAndMock;
