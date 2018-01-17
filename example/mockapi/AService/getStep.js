const { mock } = require('mockjs');

const body = mock([
  '@integer(0, 100)',
]);
module.exports = { statusCode: 200, body };
