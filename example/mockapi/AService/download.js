const { mock } = require('mockjs');

const body = mock('@range(3)');
module.exports = { statusCode: 200, body };
