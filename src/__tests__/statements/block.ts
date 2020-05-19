describe('block', () => {
  // block은 0개이상 구문을 묶을 때 사용한다.
  // block은 한쌍의 중괄호{}로 구성하여 선택적으로 label을 붙일 수 있다. label 문서 참조
  // 다른 언어에서는 block문을 compound statement(복합문)이라 부른다.
  // 자바스크립트가 여러개의 문을 하나의 문으로 묶는데 사용된다.
  // 반대 개념은 공백문이 있다. 하나의 문을 기대하는데 아무것도 제공하지 않는 걸 말한다.
  it('non-strict code일 때 var로 선언한 변수는 블록범위를 가지지 않는다.', () => {
    var x = 1;
    {
      var x = 2;
    }
    expect(x).toEqual(2);
  });

  it('let으로 선언한 식별자는 블록범위를 가진다.', () => {
    let x = 1;
    {
      let x = 2;
    }
    expect(x).toEqual(1);
  });

  it('const로 선언한 식별자는 블록범위를 가진다. SyntaxError: Identifier "c" has already been declared를 던지지 않는다.', () => {
    const x = 1;
    {
      const x = 2;
    }
    expect(x).toEqual(1);
  });
});

// ES015 strict mode부터는 블록 내의 함수는 해당 블록으로 범위가 제한된다.
// 이전 strict mode는 엄격모드에서 블록 레벨 함수를 사용할 수 없다.
