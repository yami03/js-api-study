describe('toPrecision', () => {
  const number: 5.123456 = 5.123456;

  it('고정 소수점 또는 지수 표기법의 수를 정밀 유효 숫자로 반올림한 문자열을 반환해야 한다.', () => {
    // toFixed() 메서드가 동일하게 적용되고 있다.
    expect(number.toPrecision(1)).toEqual('5');
  });

  it('@param precision는 option으로 유효자릿수를 지정하는 정수이다.', () => {
    expect(number.toPrecision(2)).toEqual('5.1');
    expect(number.toPrecision(5)).toEqual('5.1235');
  });

  it('@param precision을 생략하면 `Number.prototype.toString`과 같이 작동한다.', () => {
    expect(number.toPrecision()).toEqual('5.123456');
  });

  it('@param precision이 1에서 100사이가 아니면 RangeError가 발생한다.', () => {
    expect(() => {
      number.toPrecision(101);
    }).toThrow(RangeError);
  });

  it('일부 상황에서는 지수 표기법이 반환될 수 있다.', () => {
    expect((1234.5).toPrecision(2)).toEqual('1.2e+3');
  });
});
