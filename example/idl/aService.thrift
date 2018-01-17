namespace java com.finance.mis.web.account.service

include "./a/pageVo.thrift"
include "./a/request.thrift"
include "exception.thrift"

struct AStruct {
    1: required int id,
    2: required bool ishacker,
    # 3: required i16 name,
    4: required string name,
}

service AService {
       pageVo.PageVo search(1:request.Request SearchRequest 2: AStruct personel) throws (1:exception.Exception e) ;
       binary download(1:required string login,2:required i32 ssoid);
       list<i32> getStep(1:i32 dealId, 2:i32 buyTimeBegin, 3:i32 buyTimeEnd) throws (1:exception.Exception e);
}