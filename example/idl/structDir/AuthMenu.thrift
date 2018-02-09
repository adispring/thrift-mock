include "CommonEnum.thrift"

struct BizAcctIdAuthMenu {
    1: bool isShowIncomeExpend;
    2: bool isShowDailyProfit;
    3: bool isShowBankAccount;
    4: CommonEnum.BizType showType;
    5: CommonEnum.AcctId acctId;
}

enum IsCanWithdraw {
    canNotWithdraw = 0;
    canWithdraw = 1;
}

typedef i64 UserId


