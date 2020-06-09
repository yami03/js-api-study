describe('var', () => {
  // var로 선언된 변수의 범위는 현재 실행 컨텍스트(execution context)와 클로저이다.
  // var로 선언될 시 실행 컨텍스트안에 만들어지고
  // var로 선언되지 않은 변수들은 항상 전역변수이다.
  it('var로 선언된 변수의 범위는 현재 실행 컨텍스트(execution context)와 클로저이다.', () => {
    function foo() {
      var x: number = 1;
      function bar() {
        var y: number = 2;
        expect(x).toEqual(1);
        expect(y).toEqual(2);
      }
      bar();
      expect(x).toEqual(1);
      // TODO: scope 밖에 있는 y를 어떻게!! test하는가..
      // expect(() => y).toThrow(ReferenceError);
    }
    foo();
  });

  it('hoisting되어 code가 실행되기 전에 실행되어 undefined가 값이 된다.', () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    expect(x).toEqual(undefined);
    var x: number | undefined = 1;
    expect(x).toEqual(1);
  });

  it('global context에 정의된 var는 non-configurable property가 추가된다.', () => {
    // both NodeJS CommonJS 모듈과 native ECMAScript 모듈은
    // top-level 변수 선언은 scope가 모듈까지 적용되기 때문에
    // 글로벌 객체 프로퍼티까지 추가되지 않는다.
    // JavaScript는 automatic memory management이기 때문에 delete를 사용할 수 있다는게
    // no sense이다..

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var x: number = 1;
    // 현재 이 내부안에 globalcontext가 될 수 없음... 😭
    // expect(globalThis.hasOwnProperty('x')).toBeTruthy();
    delete globalThis.x; // strict mode는 TypeError가 되지만, 지금은 걍 실패
    // eslint-disable-next-line no-delete-var

    // 지금은 stict mode라 SyntaxtError
    // delete x;
  });

  it('global object는 scope chain 맨위에 위치한다.', () => {
    // 이는 global object의 프로퍼티는 globalThis로 이름을 한정하지 않고도
    // 모든 범위에서 편리하게 볼 수 있다.
    // globalThis가 아니라도 window나 global도

    expect(globalThis.hasOwnProperty('String')).toBeTruthy();
  });

  it('non-strict mode에서 var를 쓰고 정의하지 않았다면 global로 선언한 것이다.', () => {
    // foo:string = 'f';
    // expect(globalThis.hasOwnProperty('foo')).toBeTruthy();
  });

  it('hoisting: var 선언은 코드가 실행되기 때문에 코드 내 상단에서 선언하는 것과 같다.', () => {
    // 이러한 이유로 변수는 항상 상단에 선언하기를 바란다.
    // 그러면 scope chain문제가 해결될 것이다.

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    bla = 2;
    var bla: number;
    expect(bla).toEqual(2);
  });

  it('두 변수들의 선언 및 초기화', () => {
    var a: number = 0,
      b: number = 0;

    expect([a, b]).toEqual([0, 0]);
  });

  it('단일 문자열 값으로 두 변수들 할당', () => {
    // 2가지 방법
    var a: string = 'A';
    var b: string = a;

    expect([a, b]).toEqual(['A', 'A']);

    var c: string,
      d: string = (c = 'A');
    expect([c, d]).toEqual(['A', 'A']);
  });

  it('단일 문자열 값으로 두 변수들에 할당할 시 순서에 유의하자', () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // strict mode에서는 ReferenceError...
    /*var x: undefined = y,
      y: string = 'A';

    expect(x + y).toEqual('undefinedA'); */
  });

  it('다수의 변수들의 초기화', () => {
    var x: number = 0;

    function f() {
      // strict mode에서는 ReferenceError...
      // var x:number = y:number = 1;
    }

    f();

    // x 에 1을 할당했지만 지역변수로 선언 했기때문에 0이고
    // y는 var를 붇이지 않았기 때문에 전역변수로 선언 되었다.
    // expect([x, y]).toEqual([0, 1]);
  });

  it('암묵적인 전역변수와 외부 함수 범위', () => {
    var x: number = 0;

    // expect(z).toEqual('undefined');

    function outer() {
      var y: number = 2;

      expect([x, y]).toEqual([0, 2]);

      function inner() {
        x = 3;
        y = 4;
        // z = 5; <- 이렇게 쓰면 global variable이 되어야 하지만.. strict
      }

      inner();
      // expect(z).toEqual(5);
      expect([x, y]).toEqual([3, 4]);
    }

    outer();

    // expect(z).toEqual(5);

    // expect(y).toThrow(); referenceError 이유는 global variable이라서
  });
});
