describe('valueOf', () => {
  // 보통 JavaScript에 의해 내부적으로 호출되고,
  // 웹 코드에서는 명시적으로 호출하지 않는다.
  it('Number객체를 감싼(wrapped) 원시 값을 반환해야 한다.', () => {
    // typescript-difference-between-string-and-string
    // https://stackoverflow.com/questions/14727044/typescript-difference-between-string-and-string
    // eslint-disable-next-line no-new-wrappers
    const numObj: Number = new Number(10);
    const num: number = numObj.valueOf();
    expect(typeof numObj).toBe('object');
    expect(typeof num).toBe('number');
  });
});
