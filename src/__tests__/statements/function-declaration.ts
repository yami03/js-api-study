describe('함수 선언', () => {
  xit('if문안에 함수가 들어 갈 수 있다', () => {
    // 하지만 구현에 따라 결과에 일관성이 없으므로 이 패턴은 사용되서는 안된다.
    // 조건부로 함수를 생성한다면, 함수 표현식을 대신한다.
    var hoisted: boolean = 'foo' in this;
    expect(hoisted).toBeTruthy();
    if (false) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // 'ES3' 또는 'ES5'를 대상으로 할 경우 strict 모드의 블록 내에서 함수 선언을 사용할 수 없습니다.
      // function foo() {
      //   return 1;
      // }
    }
  });

  it('함수 선언식은 전역 범위로 끌어올려 진다.', () => {
    expect(hoisted()).toBeTruthy();

    function hoisted() {
      return true;
    }
  });

  it('함수 표현식은 끌어올려지지 않는다.', () => {
    expect(() => notHoisted()).toThrow();

    // eslint-disable-next-line @typescript-eslint/typedef
    var notHoisted = function () {
      return false;
    };
  });
});
