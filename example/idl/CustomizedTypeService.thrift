namespace java com.finance.service

include "exception.thrift"
include "./structDir/AuthMenu.thrift"

service CustomizedTypeService {
       AuthMenu.BizAcctIdAuthMenu getMenu(1:i32 acctId);
       AuthMenu.IsCanWithdraw getWithdrawType(1:i32 acctId);
       AuthMenu.UserId getUserId(1:i32 acctId);
}