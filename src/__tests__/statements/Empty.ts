describe('Empty', () => {
  it('문장이 제공되지 않는곳에 사용된다.', () => {
    const array1: number[] = [1, 2, 3];
    // 꼭 끝에 세미콜론이 필요하다. 😯
    // 어떤 문도 실행되지 않을 것이라 것을 나타내는 세미콜론과 함께 쓰인다.
    // 빈 루프 문에 쓰일 수 있다.
    // 주석을 달아주는것이 좋다.
    for (let i: number = 0; i < array1.length; array1[i++] = 0);

    expect(array1).toEqual([0, 0, 0]);
  });

  it('if...else문에서 number가 3이면 아무일이 일어나지 않는다', () => {
    const num: number = 3;
    let newNum: number = 0;
    if (num === 1) newNum = 1;
    else if (num === 2) newNum = 2;
    else if (
      num === 3 // 하지만 TS에선 쓸 수 없다 😂The body of an 'if' statement cannot be the empty statement.
    );
    else newNum = 4;
    expect(newNum).toEqual(0);
  });
});
