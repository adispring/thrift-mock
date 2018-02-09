const { mock } = require('mockjs');

const data = mock('@boolean');
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
