const { mock } = require('mockjs');

const body = mock('@word(3, 5)');
module.exports = { statusCode: 200, body };
