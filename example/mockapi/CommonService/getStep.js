const { mock } = require('mockjs');
const originData = mock(['@integer(0, 100)']);
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
