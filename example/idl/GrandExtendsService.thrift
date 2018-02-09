namespace java com.finance.web.service

include "exception.thrift"
include "ExtendsService.thrift"

service GrandExtendsService extends ExtendsService.ExtendsService {
  string       dString(1: string thing),
}