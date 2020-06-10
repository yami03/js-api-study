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

  it('같은 변수를 같은 함수나 블록 범위 내에서 재선언하면 SyntaxError가 발생한다.', () => {});
});
