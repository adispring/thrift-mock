namespace java com.finance.clearing.vo

struct StepVo {
    1: i32 buyTimeBegin; // 购买时间begin
    2: i32 buyTimeEnd; // 购买时间end
    3: double buyPrice; // 结算价
    4: i32 saleCount; // 区间销量
    5: i32 upSaleCount; // 累计销量
    6: i32 consumeCount; // 区间消费量
}
