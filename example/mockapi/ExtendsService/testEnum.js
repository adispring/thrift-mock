const { mock } = require('mockjs');
const originData = mock('@pick([1,2,3,5,6,8])');
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
