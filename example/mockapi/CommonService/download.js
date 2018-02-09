const { mock } = require('mockjs');

const data = mock('@range(3)');
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
