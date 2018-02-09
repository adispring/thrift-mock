const { mock } = require('mockjs');

const data = mock({
  message: '@word(3, 5)',
  type: '@integer(0, 100)',
});
module.exports = {
  statusCode: 200,
  body: {
    data,
  },
};
