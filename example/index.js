/* const path = require('path'); */
/* const R = require('ramda'); */
/* const recursiveParser = require('../src/recursiveParser'); */
/* const generate = require('../src/generate'); */
const config = require('./thriftmock.config');
const mock = require('../src/index');

mock(config);

/* const parstAstJson = R.compose(
 *   data => JSON.stringify(data, null, 2),
 *   mock.parseAst
 * );
 * */
/* const ast = parstAstJson(config.service[0]); */
/* const ast1 = parstAstJson(config.service[1]); */
/* var astExtends = parstAstJson(config.service[3]); */
/* var mockExtendsData = mock.parseAndMock(config.service[0]); */

/* console.log(ast); */
/* console.log(ast1); */
/* console.log(astExtends); */
/* console.log(JSON.stringify(mockExtendsData, null, 2)); */

