describe('toString', () => {
  // numObj.toString([radix])
  // radix는 option
  // Object.prototype.toString()을 상속받지 않는다.
  it('Number객체를 명시하는 문자열을 반환해야 한다.', () => {
    expect((17).toString()).toEqual('17');
  });

  it('argument radix는 2와 36사이의 정수이여야 하며 메서드는 특정 기수를 기준으로 한 진수값의 문자열을 환원하기 위한 시도를 한다.', () => {
    expect((254).toString(16)).toEqual('fe');
    expect((-10).toString(2)).toEqual('-1010');
  });

  it('numObj가 음수라면 - 부호는 기수(radix)가 2인 경우에도 유지된다.', () => {
    expect((-0xff).toString(2)).toEqual('-11111111');
  });

  it('argument radix가 생략된 경우 10진수로 가정한다.', () => {
    expect((10).toString()).toEqual('10');
    expect((17.2).toString()).toEqual('17.2');
  });

  it('2와 36사잇 값이 아닌 radix가 주어지면, RangeError에러가 발생한다', () => {
    expect(() => {
      (10).toString(37);
    }).toThrow(RangeError);
  });
});
