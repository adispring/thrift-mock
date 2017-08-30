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
}