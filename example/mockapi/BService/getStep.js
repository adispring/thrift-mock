const { mock } = require('mockjs');

const data = mock([
  {
    buyTimeBegin: '@integer(0, 100)',
    buyTimeEnd: '@integer(0, 100)',
    buyPrice: '@float(0, 100, 2, 2)',
    saleCount: '@integer(0, 100)',
    upSaleCount: '@integer(0, 100)',
    consumeCount: '@integer(0, 100)',
  },
]);
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
