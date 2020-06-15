describe('const', () => {
  // 읽기 전용
  // 재할당 할 수 없다. 보유하고 있는 값이 변경 불가능하다는 의미가 아니다.
  // temporal dead zone이 적용된다.
  it('constants는 모두 대문자를 쓴다.', () => {
    const MY_FAV: number = 7;
    // eslint-disable-next-line no-const-assign
    // expect(() => MY_FAV = 3).toThrow(TypeError)

    expect(MY_FAV).toEqual(7);
  });

  it('block scoping를 따른다', () => {
    const MY_FAV: number = 7;
    if (MY_FAV === 7) {
      // if문 블록안에만 존재하는 변수
      let MY_FAV: number = 20;

      expect(MY_FAV).toEqual(20);

      // var는 block scoping이 아니기 때문에
      // MY_FAV 상수와 충돌된다.
      // var MY_FAV = 20;
    }

    expect(MY_FAV).toEqual(7);
  });

  it('const는 초기화가 필요하다', () => {
    //  const FOO: undefined;
  });

  it('const는 object와 array에 사용할 수 있다', () => {
    const TEST: { key: string } = { key: 'value' };
    // eslint-disable-next-line no-const-assign
    // 재할당 할 수 없다.
    // expect(() => TEST = {'key':'value'}).toThrow();

    // 하지만 key에는 할당 할 수 있다.

    TEST.key = 'otherValue';
    expect(TEST).toEqual({ key: 'otherValue' });

    const ARRAY_TEST: string[] = [];
    ARRAY_TEST.push('A');

    expect(ARRAY_TEST).toEqual(['A']);

    //그러나 재할당할 순 없다.
    // MY_ARRAY = ['B'];
  });
});
