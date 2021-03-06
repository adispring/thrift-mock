const { mock } = require('mockjs');
const originData = mock({
  isShowIncomeExpend: '@boolean',
  isShowDailyProfit: '@boolean',
  isShowBankAccount: '@boolean',
  showType: '@pick([1,2])',
  acctId: '@integer(0, 100)',
});
module.exports = {
  statusCode: 200,
  body: {
    data: originData,
  },
};
