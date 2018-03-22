const R = require('ramda');
const { UNMATCHED } = require('./commonUtils');

/**
 * 1. Type Judgement
 */

// thrift types: https://thrift.apache.org/docs/types
// thrift idl:   https://thrift.apache.org/docs/idl
const BASE_TYPES = [
  'bool',
  'byte',
  'i16',
  'i32',
  'i64',
  'double',
  'string',
  'void',
];

const isBaseTypes = R.contains(R.__, BASE_TYPES);

const isListLike = R.contains(R.__, ['list', 'set']);

const isBinaryType = R.contains(R.__, ['binary']);

// Definition      ::=  Const | Typedef | Enum | Senum | Struct | Union | Exception | Service
const isDefinition = R.curry((metaType, ast, type) =>
  R.compose(R.has(type), R.pathOr({}, [metaType]))(ast)
);

const isTypedef = isDefinition('typedef');
const isEnum = isDefinition('enum');
const isStruct = isDefinition('struct');

/**
 * 2. Get Customized Type
 */

// Customized Type ::= Struct | Enum | Typedef
const getCustomizedType = R.curry((ast, type) =>
  R.compose(
    R.ifElse(
      R.whereEq({ length: 1 }),
      () =>
        R.cond([
          [isStruct(R.__, type), () => ({ struct: ast.struct[type], ast })],
          [isEnum(R.__, type), () => ({ enum: ast.enum[type], ast })],
          [isTypedef(R.__, type), () => ({ typedef: ast.typedef[type], ast })],
          [
            R.T,
            () => {
              throw new Error(
                `Type: ${type} is not in Ast:\n ${JSON.stringify(ast, null, 2)}`
              );
            },
          ],
        ])(ast),
      R.converge(getCustomizedType, [
        R.compose(R.prop(R.__, ast.include), R.head),
        R.compose(R.join('.'), R.tail),
      ])
    ),
    R.split('.')
  )(type)
);

/**
 * 3. Generate Mock Data by Type
 */

const generateBaseType = R.cond([
  [
    R.contains(R.__, ['byte', 'i16', 'i32', 'i64']),
    R.always('@integer(0, 100)'),
  ],
  [R.equals('string'), R.always('@word(3, 5)')],
  [R.equals('double'), R.always('@float(0, 100, 2, 2)')],
  [R.equals('bool'), R.always('@boolean')],
  [R.equals('void'), R.always('void')],
  [R.T, R.always(UNMATCHED)],
]);

const generateBinaryType = R.always('@range(3)');

const generateEnum = R.compose(
  arr => `@pick(${JSON.stringify(arr)})`,
  R.reduce(
    (acc, item) =>
      R.ifElse(
        R.has('value'),
        R.compose(R.append(R.__, acc), R.prop('value')),
        () => R.ifElse(R.isEmpty, R.always([0]), R.append(R.last(acc) + 1))(acc)
      )(item),
    []
  )
);

const generateStruct = R.curry((generate, structWithAst) =>
  R.transduce(
    R.map(
      R.converge(R.objOf, [
        R.converge(R.concat, [
          R.prop('name'),
          R.compose(
            t => (isListLike(t) ? '|3-6' : ''),
            R.defaultTo(''),
            R.path(['type', 'name'])
          ),
        ]),
        R.compose(generate(structWithAst.ast), R.prop('type')),
      ])
    ),
    R.merge,
    {},
    structWithAst.struct
  )
);

module.exports = {
  isBaseTypes,
  isListLike,
  isBinaryType,
  isEnum,
  isTypedef,
  getCustomizedType,
  generateBaseType,
  generateEnum,
  generateBinaryType,
  generateStruct,
};
