namespace java com.finance.mis.web.clearing.service

include "exception.thrift"
include "cService.thrift"

service DService extends cService.CService {
  string       dString(1: string thing),
}