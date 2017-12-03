namespace java com.finance.mis.web.clearing.service

include "./b/request.thrift"
include "./b/changeVo.thrift"
include "./b/stepVo.thrift"
include "exception.thrift"

service BService {
     bool submit(1: request.Request request, 2:list<changeVo.ChangeVo> changes) throws (1:exception.Exception e);
     list<stepVo.StepVo> getStep(1:i32 dealId, 2:i32 buyTimeBegin, 3:i32 buyTimeEnd) throws (1:exception.Exception e);
}

service BExtService {
     bool submitExt(1:list<changeVo.ChangeVo> changes) throws (1:exception.Exception e);
}