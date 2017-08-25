namespace java com.finance.mis.web.account.vo

struct AccountVo {
      1:string accountId;
      2:string partnerName;
      3:i32 partnerId;
      4:string accountName;
      5:list<i32> forbiddenSources;
      6:double withdrawRemain;
}

