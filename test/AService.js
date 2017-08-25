const data = {
  namespace: {
    java: {
      serviceName: 'com.finance.mis.web.account.service',
    },
  },
  include: {
    pageVo: {
      path: './a/pageVo.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.account.vo',
        },
      },
      include: {
        accountVo: {
          path: 'accountVo.thrift',
          namespace: {
            java: {
              serviceName: 'com.finance.mis.web.account.vo',
            },
          },
          struct: {
            AccountVo: [
              {
                type: 'string',
                name: 'accountId',
                id: 1,
              },
              {
                type: 'string',
                name: 'partnerName',
                id: 2,
              },
              {
                type: 'i32',
                name: 'partnerId',
                id: 3,
              },
              {
                type: 'string',
                name: 'accountName',
                id: 4,
              },
              {
                type: {
                  name: 'list',
                  valueType: 'i32',
                },
                name: 'forbiddenSources',
                id: 5,
              },
              {
                type: 'double',
                name: 'withdrawRemain',
                id: 6,
              },
            ],
          },
        },
      },
      struct: {
        PageVo: [
          {
            type: {
              name: 'list',
              valueType: 'accountVo.AccountVo',
            },
            name: 'tAccountVo',
            id: 1,
          },
          {
            type: 'i32',
            name: 'total',
            id: 2,
          },
        ],
      },
    },
    request: {
      path: './a/request.thrift',
      namespace: {
        java: {
          serviceName: 'com.finance.mis.web.account.vo',
        },
      },
      struct: {
        Request: [
          {
            type: 'i32',
            name: 'partnerId',
            id: 1,
          },
          {
            type: 'string',
            name: 'contractNum',
            id: 2,
          },
          {
            type: 'i32',
            name: 'poiId',
            id: 3,
          },
          {
            type: 'i32',
            name: 'offset',
            id: 4,
          },
          {
            type: 'i32',
            name: 'limit',
            id: 5,
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
    AStruct: [
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
    AService: {
      functions: {
        search: {
          type: 'pageVo.PageVo',
          name: 'search',
          args: [
            {
              type: 'request.Request',
              name: 'SearchRequest',
              id: 1,
            },
            {
              type: 'AStruct',
              name: 'personel',
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
      },
    },
  },
};

module.exports = data;
