/* eslint-disable no-fallthrough */
describe('switch', () => {
  it('식을 평가하고 이 표현식이 case 절과 일치하면, 뒤따르는 문장을 실행한다.', () => {
    // switch문은 먼저 expression과 맞추어 본다.
    // expression이 input expression의 결과와 동일한 값으로 평가되는 첫번째 절을 찾고 (엄격한 비교 === 사용)
    // 관련된 절을 실행한다. 오직 일치하는 첫번째 case만 실행
    // 일치하는게 없을 경우 defalut를 실행
    // 만약 default문을 찾지 못하면, 프로그램은 switch문 뒤 따르는 절을 계속해서 실행한다.
    // default 절은 마지막 절로 위치하지만, 꼭 그럴 필요는 없다.
    // 일반적으로 switch문은 일치된 문장을 한번 실행후 switch문을 빠져나와 switch 다음 문을 실행할 것을 보장한다.
    // 만약 breack가 생략되면 프로그램은 switch문 중 다음 문장을 계속 실행한다.

    let expr: string = 'Papayas';
    switch (expr) {
      case 'Oranges':
        expr = 'Oranges are $0.59 a pound.';
        break;
      case 'Mangoes':
      case 'Papayas':
        expr = 'Mangoes and papayas are $2.79 a pound.';
        break;
      default:
        expr = `Sorry, we are out of ${expr}.`;
    }

    expect(expr).toEqual('Mangoes and papayas are $2.79 a pound.');
  });

  it('break문을 생략한다면 그 이후 기준에 충족되었든 상관없이 case를 실행한다', () => {
    const foo: number = 0;
    const result: number[] = [];
    switch (foo) {
      case -1:
        result.push(-1);
      // eslint-disable-next-line no-fallthrough
      case 0:
        result.push(0);
      case 1:
        result.push(1);
      case 2:
        result.push(2);
      default:
        result.push(3);
    }

    // 일치하는 순간 아래 case부터 default까지 다 실행된다.
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it('defult는 case 사이에 존재할 수 있다.', () => {
    const foo: number = 5;
    const result: string[] = [];

    switch (foo) {
      case 2:
        result.push('2');
        break;
      default:
        result.push('result');

      case 1:
        result.push('1');
    }

    // 다른 case보다 defult를 먼저 썼을 경우 실행이 된다.
    // 하지만 break문을 생략시 다음 case도 실행된다. 😂
    expect(result).toEqual(['result', '1']);
  });

  it('Multi-case : single operation', () => {
    // https://stackoverflow.com/questions/13207927/switch-statement-multiple-cases-in-javascript
    // 이 방법은 break가 없으면 다음 case도 기준을 충족하는 지에 관계없이 싫행된다는 사실을 이용한다.
    // 연속된 case문을 하나의 operation을 하는 예
    function switchFn(animal: string) {
      switch (animal) {
        case 'Cow':
        case 'Giraffe':
        case 'Dog':
        case 'Pig':
          return "This animal will go on Noah's Ark.";
        case 'Dinosaur':
          return 'Dinosaur';
        default:
          return 'This animal will not.';
      }
    }

    expect(switchFn('Cow')).toEqual("This animal will go on Noah's Ark.");
    expect(switchFn('Giraffe')).toEqual("This animal will go on Noah's Ark.");
    expect(switchFn('Dog')).toEqual("This animal will go on Noah's Ark.");
    expect(switchFn('Pig')).toEqual("This animal will go on Noah's Ark.");
    expect(switchFn('Dinosaur')).toEqual('Dinosaur');
  });
});
