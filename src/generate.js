const R = require('ramda');
const { UNMATCHED } = require('./util');

// thrift types: https://thrift.apache.org/docs/types
// thrift idl:   https://thrift.apache.org/docs/idl
const BASE_TYPES = ['bool', 'byte', 'i16', 'i32', 'i64', 'double', 'string', 'void'];

const isBaseTypes = R.contains(R.__, BASE_TYPES);

const isListLike = R.contains(R.__, ['list', 'set']);

const isBinaryType = R.contains(R.__, ['binary']);

// Definition      ::=  Const | Typedef | Enum | Senum | Struct | Union | Exception | Service
const isDefinition = metaType => R.curry((ast, type) => R.compose(
  R.has(type),
  R.pathOr({}, [metaType])
)(ast));

const isTypedef = isDefinition('typedef');
const isEnum = isDefinition('enum');

const isStructure = R.curry((structure, type, ast) => R.compose(
  R.complement(R.isNil),
  R.path([structure, type])
)(ast));

const getStructEnumTypedef = R.curry((ast, type) => R.compose(
  R.ifElse(
    R.whereEq({ length: 1 }),
    () => R.cond([
      [isStructure('struct', type), () => ({ struct: ast.struct[type], ast })],
      [isStructure('enum', type), () => ({ enum: ast.enum[type], ast })],
      [isStructure('typedef', type), () => ({ typedef: ast.typedef[type], ast })],
      [
        R.T,
        () => {
          throw new Error([
            'Type: ',
            type.toString() + 'not in \n',
            'Ast: \n',
            JSON.stringify(ast, null, 2),
          ].join(''));
        },
      ],
    ])(ast),
    R.converge(
      getStructEnumTypedef,
      [R.compose(R.prop(R.__, ast.include), R.head), R.compose(R.join('.'), R.tail)]
    )
  ),
  R.split('.')
)(type));

const generateBaseType = R.cond([
  [R.contains(R.__, ['byte', 'i16', 'i32', 'i64']), R.always('@integer(0, 100)')],
  [R.equals('string'), R.always('@word(3, 5)')],
  [R.equals('double'), R.always('@float(0, 100, 2, 2)')],
  [R.equals('bool'), R.always('@boolean')],
  [R.equals('void'), R.always('void')],
  [R.T, R.always(UNMATCHED)],
]);

const generateEnum = R.compose(
  arr => `@pick(${JSON.stringify(arr)})`,
  R.reduce(
    (acc, item) => R.ifElse(
      R.has('value'),
      R.compose(R.append(R.__, acc), R.prop('value')),
      () => R.ifElse(
        R.isEmpty,
        R.always([0]),
        R.append(R.last(acc) + 1)
      )(acc)
    )(item),
    []
  )
);

const generateBinaryType = R.always('@range(3)');

const generateStruct = R.curry((generate, structWithAst) => R.transduce(
  R.map(
    R.converge(
      R.objOf,
      [
        R.converge(
          R.concat,
          [
            R.prop('name'),
            R.compose(
              t => (isListLike(t) ? '|3-6' : ''),
              R.defaultTo(''),
              R.path(['type', 'name'])
            ),
          ]
        ),
        R.compose(generate(structWithAst.ast), R.prop('type')),
      ]
    )
  ),
  R.merge,
  {},
  structWithAst.struct
));

const generate = R.curry((ast, type) => R.cond([
  [
    R.is(String),
    R.cond([
      [isBaseTypes, generateBaseType],
      [isBinaryType, generateBinaryType],
      [isEnum(ast), () => generateEnum(ast.enum[type].items)],
      [isTypedef(ast), () => generate(ast, ast.typedef[type].type)],
      [
        R.T,
        R.compose(
          R.cond([
            [R.has('struct'), generateStruct(generate)],
            [R.has('enum'), R.compose(generateEnum, R.path(['enum', 'items']))],
            [R.has('typedef'), R.converge(generate, [R.prop('ast'), R.path(['typedef', 'type'])])],
            [R.T, structWithAst => { throw new Error(JSON.stringify(structWithAst, null, 2)); }],
          ]),
          getStructEnumTypedef(ast)
        ),
      ],
    ]),
  ],
  [
    R.is(Object),
    typeIn => R.cond([
      [
        isListLike,
        () => R.of(generate(ast, typeIn.valueType)),
      ],
      [R.equals('map'), R.identity],
      [
        R.T,
        () => {
          throw new Error([
            'Type: ',
            typeIn.valueType.toString(),
            ', OBJECT type.valueType should be one of set/list or map',
          ].join('')
          ); },
      ],
    ])(typeIn.name),
  ],
  [R.T, R.identity],
])(type));

module.exports = generate;
module.exports.getStructEnumTypedef = getStructEnumTypedef;
