const R = require('ramda');
const {
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
} = require('./utils/generateUtils');

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
            [R.T, structWithAst => {
              throw new Error([
                'getCustomizedType\'s output should contains one of following keys: ',
                'struct/enum/typedef.\n',
                'getCustomizedType\'s actual output (structWithAst):\n',
                JSON.stringify(structWithAst, null, 2),
              ].join(''));
            }],
          ]),
          getCustomizedType(ast)
        ),
      ],
    ]),
  ],
  [
    R.is(Object),
    typeIn => R.cond([
      [isListLike, () => R.of(generate(ast, typeIn.valueType))],
      [R.equals('map'), R.identity],
      [R.T, () => {
        throw new Error(
          `Type: ${typeIn.valueType}, OBJECT valueType shoule be one of set/list/map`
        );
      }],
    ])(typeIn.name),
  ],
  [R.T, R.identity],
])(type));

module.exports = generate;
