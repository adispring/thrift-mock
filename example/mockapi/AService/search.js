const { mock } = require('mockjs');

const body = mock({
  'tAccountVo|3-6': [
    {
      accountId: '@word(3, 5)',
      partnerName: '@word(3, 5)',
      partnerId: '@integer(0, 100)',
      accountName: '@word(3, 5)',
      'forbiddenSources|3-6': [
        '@integer(0, 100)',
      ],
      withdrawRemain: '@float(0, 100, 2, 2)',
    },
  ],
  total: '@integer(0, 100)',
});
module.exports = { statusCode: 200, body };
