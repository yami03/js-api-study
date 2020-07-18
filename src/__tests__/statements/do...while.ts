describe('do...while', () => {
  it('테스트 조건이 거짓으로 평가될 때까지 실행된다.', () => {
    let result: string = '';
    let i: number = 0;
    do {
      i += 1;
      result += i + ' ';
    } while (i > 0 && i < 5);

    expect(result).toEqual('1 2 3 4 5 ');
  });
});
