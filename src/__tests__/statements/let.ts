/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-redeclare */
describe('let', () => {
  // let은 변수가 선언된 블록, 구문 또는 표현식 내에서만 유효한 변수
  // var처럼 블록 범위에 관계없이 전역변수 및 함수 전체 로컬에 정의는 없다.
  // 전역에 선언 되었을 땐 window객체 속성을 생성(var는 생성)하지 않는다.
  it('let으로 선언된 변수는 변수가 선언된 블록 내에서만 유효하다', () => {
    function varTest() {
      var x: number = 1;
      if (true) {
        var x: number = 2; // 상위에 있는 x = 1과 같은 변수이다.
        expect(x).toEqual(2);
      }
      expect(x).toEqual(2);
    }

    function letTest() {
      let x: number = 1;
      if (true) {
        let x: number = 2; // 상위 블록과 다른 변수 이다.
        if (true) {
          let x: number = 2;
          expect(x).toEqual(2);
        }
      }
      expect(x).toEqual(1);
    }

    varTest();
    letTest();
  });

  xit('let은 전역 객체의 속성을 생성하지 않는다.', () => {
    var x: string = 'global';
    var y: string = 'global';

    expect(globalThis.x).toEqual('global');
    expect(globalThis.y).toEqual(undefined);
  });

  it('생성자와 함께 사용하면 클로저를 사용하지 않고 비공개 변수를 만들고 접근할 수 있다.', () => {
    var Thing: () => void;

    interface Thing {
      showPublic(): number;
      showPrivate(): number;
    }

    {
      // WeakMap객체는 키가 약하게(?) 참조되는 키/값 쌍의 컬렉션이다.
      // 원시값은 key가 될 수 없다.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let privateScope: WeakMap<object, any> = new WeakMap();
      let counter: number = 0;

      Thing = function () {
        this.someProperty = 'foo';

        privateScope.set(this, {
          hidden: ++counter,
        });
      };

      Thing.prototype.showPublic = function () {
        return this.someProperty;
      };

      Thing.prototype.showPrivate = function () {
        console.log(privateScope.get(this));
        return privateScope.get(this).hidden;
      };
    }

    var thing: () => void = new Thing();

    expect(thing).toEqual({ someProperty: 'foo' });
    // Property 'showPublic' does not exist on type '() => void'
    // 타입 정의가 필요한데 못찾음..
    // https://ultimatecourses.com/blog/typescript-classes-and-constructors
    // class로 바꾸는게 좋지 않을까?
    // expect(thing.showPublic()).toEqual('foo');
  });

  xit('같은 변수를 같은 함수나 블록 범위 내에서 재선언하면 SyntaxError가 발생한다.', () => {
    let foo: undefined;
    // let foo: undefined; Cannot redeclare block-scoped variable 'foo'
  });

  it('switch문에선 블록이 하나이기 때문에 중복 선언을 피하기 위해 case마다 블록으로 감싸야한다', () => {
    let x: number = 1;

    switch (x) {
      case 0: {
        let foo: undefined;
        break;
      }
      case 1: {
        let foo: undefined;
        break;
      }
    }
  });

  it('초기화(선언)되기 전에 같은 블록내에서 참조할 경우 ReferenceError가 발생한다.', () => {
    // temporal dead zone: 블록 시작 부분부터 선언이 실행되기 전까지
    expect(() => foo).toThrow(ReferenceError);

    let foo: number = 2;
  });

  it('temporal dead zone에서 typeof를 사용하면 ReferenceError가 발생한다', () => {
    // expect(typeof undeclaredVariable).toEqual(undefined);

    expect(() => typeof i).toThrow(ReferenceError);
    let i: number = 10;
  });

  xit('lexical scoping으로 인해 가장 가까이 선언된 변수를 참조하려고 한다', () => {
    // "어디서 호출하는지가 아니라 처음 선언되었을 때에 어떤 스코프에 있는지"가 중요
    var foo: number = 33;
    if (true) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define

      expect(() => {
        // 여기서 (foo + 55)가 참조하는것은lexical scoping으로 인하여 let으로 선언된 foo이다.
        // 하지만 초기화가 완료되기 전에 참조하였기 때문에 ReferenceError가 된다.
        // temporal dead zone에 해당된다.
        // let foo: number = foo + 55;
      }).toThrow(ReferenceError);
    }
  });

  xit('lexical scoping과 temporal dead zone에 유의하쟈..', () => {
    function go(n: { a: number[] }) {
      console.log(n);

      /* expect(() => {
      // lexical scoping으로 인하여 n.a는 바로 앞에 있는 n을 참고 하려고 하고
      // n은 아직 초기화가 종료되지 않았기 때문에 temporal dead zone에 해당된다.
        for (let n of n.a) {
          console.log(n);
        }
      }).toThrow(ReferenceError); */
    }

    go({ a: [1, 2, 3] });
  });

  it('let의 유효 범위는 블록이다.', () => {
    // var의 유효 범위는 함수 내 또는 전역을 유효 범위로 가진다.
    var a: number = 1;
    var b: number = 2;

    if (a === 1) {
      var a: number = 11; // 전역에 있는 a의 값이 바뀐다.
      let b: number = 22; // if 내 블록 변수

      expect(a).toEqual(11);
      expect(b).toEqual(22);
    }

    expect(a).toEqual(11);
    expect(b).toEqual(2);
  });
});
