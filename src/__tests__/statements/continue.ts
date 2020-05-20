describe('continue', () => {
  // break문과 달리 continue는 루프의 실행의 완전히 종료하지 않고,
  // for, while문에서 다음과 같이 동작한다.
  it('continue문은 현재 반복 또는 labeled loop에서 문장의 실행을 종료하고, 다음 반복으로 루프의 실행을 계속한다.', () => {
    let text: string = '';

    for (let i: number = 0; i < 10; i++) {
      if (i === 3) {
        continue;
      }
      text += i;
    }

    expect(text).toEqual('012456789');
  });

  it('while 루프에서는 다시 조건으로 점프한다.', () => {
    var i: number = 0;
    var n: number = 0;

    while (i < 5) {
      i++;

      if (i === 3) {
        continue;
      }

      n += i;
    }
    expect(i).toEqual(5);
  });

  xit('label과 함께 continue 사용하기', () => {
    var i: number = 0;
    var j: number = 8;

    checkiandj: while (i < 4) {
      console.log('i: ' + i);
      i += 1;

      checkj: while (j > 4) {
        console.log('j: ' + j);
        j -= 1;

        if (j % 2 == 0) continue checkj;
        console.log(j + ' is odd.');
      }
      console.log('i = ' + i);
      console.log('j = ' + j);
    }
  });
});
