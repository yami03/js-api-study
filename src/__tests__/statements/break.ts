/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
describe('break', () => {
  xit('반복문, switch문, label문을 종료하고 그 다음문으로 프로그램 제어를 넘긴다.', () => {
    let i: number = 0;
    while (i < 6) {
      if (i === 3) break;
      i = i + 1;
    }

    expect(i).toEqual(3);
  });

  it('label block과 beack문 함께 사용할 수 있다. break문은 자신이 참조하는 label내에 중첩되어야 한다.', () => {
    let i: number = 0;
    outer_block: {
      inner_block: {
        i = 2;
        break outer_block;
        i = 3; // 건너뛴다.
      }
      i = 4; // 건너뛴다.
    }

    expect(i).toEqual(2);
  });

  it('label이 중첩되지 않고 break를 사용한 경우, Syntax Error가 발생한다.', () => {
    try {
      let i: number = 1;
      block_1: {
        i = 2;
        // break block2;
      }

      block_2: {
        i = 3;
      }
    } catch (e) {
      expect(e).toThrow(SyntaxError);
    }
  });

  xit('함수로 인하여 중첩되어 있기 때문에 Syntax Error가 발생한다.', () => {
    try {
      var i: number = 0;

      while (i < 6) {
        if (i === 3) {
          (function () {
            // break;
          })();
          i += 1;
        }
      }
    } catch (e) {
      expect(e).toThrow(SyntaxError);
    }
  });

  it('함수로 인하여 중첩되어 있기 때문에 Syntax Error가 발생한다.', () => {
    try {
      var i: number = 0;
      block_1: {
        i = +1;
        (function () {
          // break block_1;
        })();
      }
    } catch (e) {
      expect(e).toThrow(SyntaxError);
    }
  });
});
