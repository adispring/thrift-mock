namespace java com.finance.mis.web.clearing.service

include "./b/request.thrift"
include "./b/changeVo.thrift"
include "./b/stepVo.thrift"
include "exception.thrift"
include "bService.thrift"

// thrift sample code:
// https://git-wip-us.apache.org/repos/asf?p=thrift.git;a=blob_plain;f=test/ThriftTest.thrift;hb=HEAD

// enum Numberz
// {
//   ONE = 1,
//   TWO,
//   THREE,
//   FIVE = 5,
//   SIX,
//   EIGHT = 8
// }

typedef i64 UserId
struct Bonk
{
  1: string message,
  2: i32 type
}
typedef Bonk BonkAlias

service CService extends bService.BService {
  /**
   * Prints 'testString("%s")' with thing as '%s'
   * @param string thing - the string to print
   * @return string - returns the string 'thing'
   */
  string       testString(1: string thing),

  /**
   * Prints 'testEnum("%d")' where thing has been formatted into it's numeric value
   * @param Numberz thing - the Numberz to print
   * @return Numberz - returns the Numberz 'thing'
   */
  // Numberz      testEnum(1: Numberz thing),

  /**
   * Prints 'testTypedef("%d")' with thing as '%d'
   * @param UserId thing - the UserId to print
   * @return UserId - returns the UserId 'thing'
   */
  UserId       testTypedef(1: UserId thing),

  BonkAlias    testTypedefStruct(1: string thing),
}