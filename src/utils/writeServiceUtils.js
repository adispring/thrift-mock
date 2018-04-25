const R = require('ramda');

const defaultExports =
  'module.exports = { statusCode: 200, body: { data: originData } };';
const formatExports = R.compose(
  exportsStruct => `module.exports = ${exportsStruct}`,
  R.replace(/["']@@dataPlaceholder["']/g, 'originData'),
  originExports => JSON.stringify(originExports, null, 2)
);

const formatExportsTemplate = R.ifElse(
  R.isNil,
  R.always(defaultExports),
  formatExports
);

module.exports = {
  formatExportsTemplate,
};
