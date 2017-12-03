const R = require('ramda');
const tape = require('tape');
const recursiveParser = require('../src/recursiveParser');
const aService = require('./AService');
const config = require('../example/thriftmock.config');

const samePath = R.curry((obja, objb, path) => R.compose(
  R.map,
  R.path,
  R.split('.')
)(path)([obja, objb]));

tape('recursiveParser', t => {
  const aServiceAst = recursiveParser(config.service[0]);
  const aSamePath = samePath(aServiceAst, aService);
  t.deepEqual(...aSamePath('struct.AStruct'), 'define struct in current file');

  t.deepEqual(
    ...aSamePath('include.pageVo.struct.PageVo'),
    'include struct from different directory file'
  );
  t.deepEqual(
    aService.include.pageVo.path,
    './a/pageVo.thrift',
    'include struct from different directory'
  );

  t.deepEqual(
    ...aSamePath('include.pageVo.include.accountVo'),
    'recursively include struct from different directory file'
  );

  t.end();
});
