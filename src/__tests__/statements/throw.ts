/* eslint-disable no-new-wrappers */
describe('throw', () => {
  // 사용자 정의 예외를 발생시킨다.
  // 현재 함수의 실행이 중지된다.
  // catch 호출 스택의 첫 번째 블록으로 제어가 전달된다.
  // 호출자 함수 사이에 catch 블록이 없으면 프로그램이 종료된다.
  // throw expression
  // expression -> 예외를 발생시키는 식
  // throw문장은 throw 키와드와 표현 사이에 줄 바꿈을 허용되지 않기 때문에
  // 자동 세미콜론 삽입의 영향을 받는다.
  it('객체에서 예외를 발생시킨다.', () => {
    // catch블록에서 해당 객체의 속성을 볼 수 있다.
    // UserException 유형의 객체를 만들고 throw 구문에서 이 객체를 사용한다.
    function UserException(message: string) {
      this.message = message;
      this.name = 'UserException';
    }

    function getMonthName(mo: number) {
      mo = mo - 1;
      var months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (months[mo] !== undefined) return months[mo];
      throw new UserException('InvalidMonthNo');
    }

    try {
      getMonthName(15);
    } catch (e) {
      expect(e.message).toEqual('InvalidMonthNo');
      expect(e.name).toEqual('UserException');
    }
  });

  it('객체에서 예외를 발생시키는 다른 예', () => {
    // 미국 우편번호인지 여부를 테스트한다.
    // 우편번호가 잘못된 형식을 사용했을 경우
    // throw문세어 ZipCodeFormatException형식의 객체를 생성하고 예외를 발생시킨다.

    // ZipCode constructor에서 전달된 인수가 이 패턴들 중 어느것에도 일치하지 않는다면
    // 예외가 발생한다.

    function ZipCode(zip: number | string) {
      var newZip: string = String(zip);
      var pattern: RegExp = /[0-9]{5}([- ]?[0-9]{4})?/;
      if (pattern.test(newZip)) {
        //this.value = newZip.match(pattern)[0];
        this.valueOf = function () {
          return this.value;
        };
        this.toString = function () {
          return String(this.value);
        };
      } else {
        // throw new ZipCodeFormatException(zip);
      }
    }
  });
});
