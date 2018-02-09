# thrift-mock

Mock response data from thrift idl files.

## Main Features

- Customize module.exports template. (the mock data MUST using '@@dataPlaceholder' as its placeholder)
- Method extends.

## Config & Execute

```javascript
const mock = require('thrift-mock');

const config = {
  service: [
    require.resolve('./idl/a.thrift'),
    require.resolve('./idl/b.thrift'),
    /* require.resolve('./idl/CommonService.thrift'),*/
    /* require.resolve('./idl/BaseService.thrift'),*/
    /* require.resolve('./idl/ExtendsService.thrift'),*/
    /* require.resolve('./idl/GrandExtendsService.thrift'),*/
    /* require.resolve('./idl/CustomizedTypeService.thrift'),*/
  ],
  output: {
    path: path.resolve(__dirname, 'mockapi'),
  },
  exportsTemplate: {
    statusCode: 200,
    body: {
      data: '@@dataPlaceholder',
    },
  },
};

mock(config);
```

## Source

### idl directory structure

```bash
idl
├── a
│   ├── accountVo.thrift
│   ├── pageVo.thrift
│   └── request.thrift
├── aService.thrift
├── b
│   ├── changeVo.thrift
│   ├── request.thrift
│   └── stepVo.thrift
├── bService.thrift
└── exception.thrift
```

### aService's methods and modals

```c++
// aService.thrift
namespace java com.finance.account.service

include "./structDir/a/pageVo.thrift"
include "./structDir/a/request.thrift"
include "exception.thrift"

struct AStruct {
    1: required int id,
    2: required bool ishacker,
    # 3: required i16 name,
    4: required string name,
}

service AService {
       pageVo.PageVo search(1:request.Request SearchRequest 2: AStruct personel) throws (1:exception.Exception e) ;
}

// ./structDir/a/pageVo.thrift
include "accountVo.thrift"

struct PageVo{
     1:list<accountVo.AccountVo> tAccountVo;
     2:i32 total;
}

// ./structDir/a/accountVo.thrift
struct AccountVo {
      1:string accountId;
      2:string partnerName;
      3:i32 partnerId;
      4:string accountName;
      5:list<i32> forbiddenSources;
      6:double withdrawRemain;
}

// ./structDir/a/request.thrift
struct Request{
      1:i32 partnerId;
      2:string contractNum;
      3:i32 poiId;
      4:i32 offset;
      5:i32 limit;
}

// ./exception.thrift
exception Exception {
    1: i32 code; // 异常编码
    2: string message; // 异常原因
}
```

## Output

It will output each thrift method with a mock file, which contains a [mockjs](http://mockjs.com/examples.html) template. You can then custom the properties as you need.

The mocked method's filepath as follows:

```bash
${config.output.path}/${serviceName}/${methodName}.js
```

Demo output tree structure:

```bash
mockapi
├── AService
│   └── search.js
└── BService
    ├── getStep.js
    └── submit.js
```

mockapi/Aservice/search.js 's content: 

```js
const { mock } = require('mockjs');

const body = mock({
  'tAccountVo|3-6': [
    {
      accountId: '@word(3, 5)',
      partnerName: '@word(3, 5)',
      partnerId: '@integer(0, 100)',
      accountName: '@word(3, 5)',
      'forbiddenSources|3-6': [
        '@integer(0, 100)',
      ],
      withdrawRemain: '@float(0, 100, 2, 2)',
    },
  ],
  total: '@integer(0, 100)',
});
module.exports = { statusCode: 200, body };
```

## TODO

- add unit test.
- add args judgement(args' type & count) by api property: `args`.
- mock data more real.

