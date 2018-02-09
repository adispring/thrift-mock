const { mock } = require('mockjs');

const data = mock([
  '@integer(0, 100)',
]);
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
