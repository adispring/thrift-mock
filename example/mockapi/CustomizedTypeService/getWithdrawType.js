const { mock } = require('mockjs');

const data = mock('@pick([0,1])');
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
