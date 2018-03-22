const { mock } = require('mockjs');
const originData = mock('@boolean');
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
