/* eslint no-console: 0 */
const path = require('path');

/**
 * Mock configuration.
 * @property [Service] service: Services to mock.
 * @property {path} output: Mock files' output path
 */

const config = {
  service: [
    require.resolve('./idl/CommonService.thrift'),
    require.resolve('./idl/BaseService.thrift'),
    require.resolve('./idl/ExtendsService.thrift'),
    require.resolve('./idl/GrandExtendsService.thrift'),
    require.resolve('./idl/CustomizedTypeService.thrift'),
  ],
  output: {
    path: path.resolve(__dirname, 'mockapi'),
  },
  exportsTemplate: {
    statusCode: 200,
    body: {
      data: '@@dataPlaceholder',
    },
  },
};

module.exports = config;

if (require.main === module) {
  console.info(module.exports);
}
