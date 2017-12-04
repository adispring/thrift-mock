const R = require('ramda');
const { UNMATCHED } = require('./util');

// thrift types: https://thrift.apache.org/docs/types
// thrift idl:   https://thrift.apache.org/docs/idl
const BASE_TYPES = ['bool', 'byte', 'i16', 'i32', 'i64', 'double', 'string', 'void'];

const isBaseTypes = R.contains(R.__, BASE_TYPES);

const isListLike = R.contains(R.__, ['list', 'set']);

// Definition      ::=  Const | Typedef | Enum | Senum | Struct | Union | Exception | Service
const isDefinition = metaType => R.curry((ast, type) => R.compose(
  R.has(type),
  R.pathOr({}, [metaType])
)(ast));

const isTypedef = isDefinition('typedef');
const isEnum = isDefinition('enum');

const generateBaseType = R.cond([
  [R.contains(R.__, ['byte', 'i16', 'i32', 'i64']), R.always('@integer(0, 100)')],
  [R.equals('string'), R.always('@word(3, 5)')],
  [R.equals('double'), R.always('@float(0, 100, 2, 2)')],
  [R.equals('bool'), R.always('@boolean')],
  [R.equals('void'), R.always('void')],
  [R.T, () => R.always(UNMATCHED)],
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

const getStruct = R.curry((ast, type) => R.compose(
  R.ifElse(
    R.whereEq({ length: 1 }),
    () => ({ struct: ast.struct[type], ast }),
    R.converge(
      getStruct,
      [R.compose(R.prop(R.__, ast.include), R.head), R.compose(R.join('.'), R.tail)]
    )
  ),
  R.split('.')
)(type));


const generate = R.curry((ast, type) => R.cond([
  [
    R.is(String),
    R.cond([
      [isBaseTypes, generateBaseType],
      [isEnum(ast), () => generateEnum(ast.enum[type].items)],
      [isTypedef(ast), () => generate(ast, ast.typedef[type].type)],
      [
        R.T,
        R.compose(
          next => R.transduce(
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
                  R.compose(generate(next.ast), R.prop('type')),
                ]
              )
            ),
            R.merge,
            {},
            next.struct
          ),
          getStruct(ast)
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
module.exports.getStruct = getStruct;
