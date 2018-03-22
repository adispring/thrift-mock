const { mock } = require('mockjs');
const originData = mock('@pick([0,1])');
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
