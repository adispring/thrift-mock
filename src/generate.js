const R = require('ramda');
const {
  UNMATCHED,
} = require('./util');

// thrift types: https://thrift.apache.org/docs/types
const BASE_TYPES = ['bool', 'byte', 'i16', 'i32', 'i64', 'double', 'string', 'void'];

const isBaseTypes = R.contains(R.__, BASE_TYPES);

const isListLike = R.contains(R.__, ['list', 'set']);

const generateBaseType = R.cond([
  [R.contains(R.__, ['byte', 'i16', 'i32', 'i64']), R.always('@integer(0, 100)')],
  [R.equals('string'), R.always('@word(3, 5)')],
  [R.equals('double'), R.always('@float(0, 100, 2, 2)')],
  [R.equals('bool'), R.always('@boolean')],
  [R.equals('void'), R.always('void')],
  [R.T, () => R.always(UNMATCHED)],
]);

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
    R.ifElse(
      isBaseTypes,
      generateBaseType,
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
      )
    ),
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