/* eslint-disable no-new-wrappers */
describe('if...else', () => {
  it('if문은 지정한 조건이 truthy인 경우 명령문(statement)을 실행한다.', () => {
    // 조건이 falsy일 때 다른 조건문이 실행 될 수 있다.
    function testNum(a: number): string {
      let result: string = '';
      if (a > 0) {
        result = 'positive';
      } else {
        result = 'NOT positive';
      }
      return result;
    }
    expect(testNum(-5)).toEqual('NOT positive');
  });

  it('falsy(false, undefined, null, "", 0, NaN) 뺀 모든 값, 그리고 false 값인 Boolean 객체는 truthy이다', () => {
    var b: Boolean = new Boolean(false);

    expect(b).toBeTruthy();
  });

  it('조건식은 대입을 사용하지 않는게 바람직 하다. 할당이 필요하다면 괄호를 써야한다.', () => {
    let x: number = 1;
    let y: number = 2;

    if ((x = y)) {
      expect(x).toEqual(2);
    }
  });
});
