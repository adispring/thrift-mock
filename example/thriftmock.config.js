/* eslint no-console: 0 */
const path = require('path');

/**
 * Mock configuration.
 * @property [Service] service: Services to mock.
 * @property {path} output: Mock files' output path
 */

const config = {
  service: [
    require.resolve('./idl/aService.thrift'),
    require.resolve('./idl/bService.thrift'),
    require.resolve('./idl/cService.thrift'),
    require.resolve('./idl/dService.thrift'),
    require.resolve('./idl/eService.thrift'),
    require.resolve('./idl/fService.thrift'),
  ],
  output: {
    path: path.resolve(__dirname, 'mockapi'),
  },
};

module.exports = config;

if (require.main === module) {
  console.info(module.exports);
}
