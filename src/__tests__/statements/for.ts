describe('for', () => {
  it('initialization block은 필수 요소가 아니다.', () => {
    let i: number = 0;
    for (; i < 9; i++);

    expect(i).toEqual(9);
  });

  it('condition block도 옵션이다.', () => {
    // 하지만 condition block을 생략한다면 무한루프에 걸리기 때문에
    // break point를 꼭 만든다.
    for (let i: number = 0; ; i++) {
      if (i > 3) {
        expect(i).toEqual(4);
        break;
      }
    }
  });

  it('initialization과 condition과 final expression 모두 생략가능하다', () => {
    let i: number = 0;

    for (;;) {
      if (i > 3) {
        expect(i).toEqual(4);
        break;
      }
      i++;
    }
  });
});
