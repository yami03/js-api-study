describe('class 선언문', () => {
  it('class선언은 프로토타입 기반 상속을 사용하여, 주어진 이름의 새로운 클래스를 만든다.', () => {
    class Polygon {
      area: number;
      constructor(height: number, width: number) {
        this.area = height * width;
      }
    }

    expect(new Polygon(4, 3).area).toEqual(12);
  });

  it('간단한 클래스 상속', () => {
    class Polygon {
      name: string;
      height: number;
      width: number;
      constructor(height: number, width: number) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
      }
    }

    class Square extends Polygon {
      constructor(length: number) {
        super(length, length);
        this.name = 'Square';
      }
    }

    expect(new Square(3).name).toEqual('Square');
    expect(new Square(3).height).toEqual(3);
    expect(new Square(3).width).toEqual(3);
  });

  xit('class 선언은 같은 클래스를 두 번 선언하려고 하면 오류가 발생한다', () => {
    // expect(() => {
    //   class Foo {};
    //   class Foo {};
    // }).toThrow(SyntaxError);
    // expect(() => {
    //   var Foo = class {};
    //   class Foo {};
    // }).toThrow(TypeError);
  });
});

describe('class 표현식', () => {
  it('class식의 경우 클래스명("binding identifier")을 생략 할 수 있다.', () => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const Foo = class {
      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor() {}
      bar(): string {
        return 'Hello World!';
      }
    };

    // eslint-disable-next-line @typescript-eslint/typedef
    const instance = new Foo();
    instance.bar();

    expect(instance.bar()).toEqual('Hello World!');
    expect(Foo.name).toEqual('Foo');
  });
});
