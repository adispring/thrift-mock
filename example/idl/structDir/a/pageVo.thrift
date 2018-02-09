namespace java com.finance.account.vo

include "accountVo.thrift"

struct PageVo{
     1:list<accountVo.AccountVo> tAccountVo;
     2:i32 total;
}