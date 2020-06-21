describe('return', () => {
  // 함수 실행을 종료하고, 주어진 값을 함수 호출 지점으로 반환한다.
  // return [[expression]]
  // 반환할 값으로 사용할 표현식
  // 생략할 경우 undefined를 반환한다,
  // return은 function body에 사용할 수 있고, 함수의 실행은 종료된다.

  it('value를 생략한 경우 undefined를 반환한다.', () => {
    function omitValue(): void {
      return;
    }
    expect(omitValue()).toEqual(undefined);
  });

  it('automatic semicolon insertion(ASI)의 영향을 받는다.', () => {
    // 표현식과 return사이에는 줄바꿈 문자가 올 수 없다.
    function hasLine(): void {
      return;
      // eslint-disable-next-line no-unreachable
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      3;
    }
    //이는
    // return;
    // 3; 처럼 처리된다.

    expect(hasLine()).toEqual(undefined);
  });
});
