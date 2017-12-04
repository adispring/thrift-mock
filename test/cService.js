const data = {
  namespace: {
    java: {
      serviceName: 'com.finance.mis.web.clearing.service',
    },
  },
  include: {
    request: {
      path: './b/request.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.clearing.vo',
        },
      },
      struct: {
        Request: [
          {
            type: 'i32',
            name: 'dealId',
            id: 1,
          },
          {
            type: 'string',
            name: 'ecomReason',
            id: 2,
          },
          {
            type: 'string',
            name: 'misReason',
            id: 3,
          },
          {
            type: 'i32',
            name: 'operator',
            id: 4,
          },
        ],
      },
    },
    changeVo: {
      path: './b/changeVo.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.clearing.vo',
        },
      },
      struct: {
        ChangeVo: [
          {
            type: 'i32',
            name: 'buyTimeBegin',
            id: 1,
          },
          {
            type: 'i32',
            name: 'buyTimeEnd',
            id: 2,
          },
          {
            type: 'double',
            name: 'oldBuyPrice',
            id: 3,
          },
          {
            type: 'double',
            name: 'newBuyPrice',
            id: 4,
          },
        ],
      },
    },
    stepVo: {
      path: './b/stepVo.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.clearing.vo',
        },
      },
      struct: {
        StepVo: [
          {
            type: 'i32',
            name: 'buyTimeBegin',
            id: 1,
          },
          {
            type: 'i32',
            name: 'buyTimeEnd',
            id: 2,
          },
          {
            type: 'double',
            name: 'buyPrice',
            id: 3,
          },
          {
            type: 'i32',
            name: 'saleCount',
            id: 4,
          },
          {
            type: 'i32',
            name: 'upSaleCount',
            id: 5,
          },
          {
            type: 'i32',
            name: 'consumeCount',
            id: 6,
          },
        ],
      },
    },
    exception: {
      path: 'exception.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web',
        },
      },
      exception: {
        Exception: [
          {
            type: 'i32',
            name: 'code',
            id: 1,
          },
          {
            type: 'string',
            name: 'message',
            id: 2,
          },
        ],
      },
    },
    bService: {
      path: 'bService.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.clearing.service',
        },
      },
      include: {
        request: {
          path: './b/request.thrift',
          namespace: {
            java: {
              serviceName: 'com.finance.mis.web.clearing.vo',
            },
          },
          struct: {
            Request: [
              {
                type: 'i32',
                name: 'dealId',
                id: 1,
              },
              {
                type: 'string',
                name: 'ecomReason',
                id: 2,
              },
              {
                type: 'string',
                name: 'misReason',
                id: 3,
              },
              {
                type: 'i32',
                name: 'operator',
                id: 4,
              },
            ],
          },
        },
        changeVo: {
          path: './b/changeVo.thrift',
          namespace: {
            java: {
              serviceName: 'com.finance.mis.web.clearing.vo',
            },
          },
          struct: {
            ChangeVo: [
              {
                type: 'i32',
                name: 'buyTimeBegin',
                id: 1,
              },
              {
                type: 'i32',
                name: 'buyTimeEnd',
                id: 2,
              },
              {
                type: 'double',
                name: 'oldBuyPrice',
                id: 3,
              },
              {
                type: 'double',
                name: 'newBuyPrice',
                id: 4,
              },
            ],
          },
        },
        stepVo: {
          path: './b/stepVo.thrift',
          namespace: {
            java: {
              serviceName: 'com.finance.mis.web.clearing.vo',
            },
          },
          struct: {
            StepVo: [
              {
                type: 'i32',
                name: 'buyTimeBegin',
                id: 1,
              },
              {
                type: 'i32',
                name: 'buyTimeEnd',
                id: 2,
              },
              {
                type: 'double',
                name: 'buyPrice',
                id: 3,
              },
              {
                type: 'i32',
                name: 'saleCount',
                id: 4,
              },
              {
                type: 'i32',
                name: 'upSaleCount',
                id: 5,
              },
              {
                type: 'i32',
                name: 'consumeCount',
                id: 6,
              },
            ],
          },
        },
        exception: {
          path: 'exception.thrift',
          namespace: {
            java: {
              serviceName: 'com.finance.mis.web',
            },
          },
          exception: {
            Exception: [
              {
                type: 'i32',
                name: 'code',
                id: 1,
              },
              {
                type: 'string',
                name: 'message',
                id: 2,
              },
            ],
          },
        },
      },
      struct: {
        BStruct: [
          {
            type: 'int',
            name: 'id',
            id: 1,
            option: 'required',
          },
          {
            type: 'bool',
            name: 'ishacker',
            id: 2,
            option: 'required',
          },
          {
            type: 'string',
            name: 'name',
            id: 4,
            option: 'required',
          },
        ],
      },
      service: {
        BService: {
          functions: {
            submit: {
              type: 'bool',
              name: 'submit',
              args: [
                {
                  type: 'request.Request',
                  name: 'request',
                  id: 1,
                },
                {
                  type: {
                    name: 'list',
                    valueType: 'changeVo.ChangeVo',
                  },
                  name: 'changes',
                  id: 2,
                },
              ],
              throws: [
                {
                  type: 'exception.Exception',
                  name: 'e',
                  id: 1,
                },
              ],
              oneway: false,
            },
            getStep: {
              type: {
                name: 'list',
                valueType: 'stepVo.StepVo',
              },
              name: 'getStep',
              args: [
                {
                  type: 'i32',
                  name: 'dealId',
                  id: 1,
                },
                {
                  type: 'i32',
                  name: 'buyTimeBegin',
                  id: 2,
                },
                {
                  type: 'i32',
                  name: 'buyTimeEnd',
                  id: 3,
                },
              ],
              throws: [
                {
                  type: 'exception.Exception',
                  name: 'e',
                  id: 1,
                },
              ],
              oneway: false,
            },
          },
        },
        BExtService: {
          functions: {
            submitExt: {
              type: 'bool',
              name: 'submitExt',
              args: [
                {
                  type: {
                    name: 'list',
                    valueType: 'changeVo.ChangeVo',
                  },
                  name: 'changes',
                  id: 1,
                },
              ],
              throws: [
                {
                  type: 'exception.Exception',
                  name: 'e',
                  id: 1,
                },
              ],
              oneway: false,
            },
          },
        },
      },
    },
  },
  enum: {
    Numberz: {
      items: [
        {
          name: 'ONE',
          value: 1,
        },
        {
          name: 'TWO',
        },
        {
          name: 'THREE',
        },
        {
          name: 'FIVE',
          value: 5,
        },
        {
          name: 'SIX',
        },
        {
          name: 'EIGHT',
          value: 8,
        },
      ],
    },
  },
  typedef: {
    UserId: {
      type: 'i64',
    },
    BonkAlias: {
      type: 'Bonk',
    },
  },
  struct: {
    Bonk: [
      {
        type: 'string',
        name: 'message',
        id: 1,
      },
      {
        type: 'i32',
        name: 'type',
        id: 2,
      },
    ],
  },
  service: {
    CService: {
      extends: 'bService.BService',
      functions: {
        testString: {
          type: 'string',
          name: 'testString',
          args: [
            {
              type: 'string',
              name: 'thing',
              id: 1,
            },
          ],
          throws: [],
          oneway: false,
        },
        testEnum: {
          type: 'Numberz',
          name: 'testEnum',
          args: [
            {
              type: 'Numberz',
              name: 'thing',
              id: 1,
            },
          ],
          throws: [],
          oneway: false,
        },
        testTypedef: {
          type: 'UserId',
          name: 'testTypedef',
          args: [
            {
              type: 'UserId',
              name: 'thing',
              id: 1,
            },
          ],
          throws: [],
          oneway: false,
        },
        testTypedefStruct: {
          type: 'BonkAlias',
          name: 'testTypedefStruct',
          args: [
            {
              type: 'string',
              name: 'thing',
              id: 1,
            },
          ],
          throws: [],
          oneway: false,
        },
      },
    },
  },
};

module.exports = data;
