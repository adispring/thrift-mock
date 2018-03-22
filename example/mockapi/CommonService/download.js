const { mock } = require('mockjs');
const originData = mock('@range(3)');
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
