const { mock } = require('mockjs');

const body = mock('@pick([0,1])');
module.exports = { statusCode: 200, body };
