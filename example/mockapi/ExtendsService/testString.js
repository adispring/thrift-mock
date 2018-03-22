const { mock } = require('mockjs');
const originData = mock('@word(3, 5)');
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
