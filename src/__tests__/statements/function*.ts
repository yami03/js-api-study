describe('function*', () => {
  // 끝에 별표가 있는 function*은 generator 객체를 반환한다.
  // Generator는 빠져나갔다가 나중에 다시 돌아올 수 있는 함수이다.
  // JavaScript Generator는 Callback Hell및 Inversion of Control과 같은 문제를 완화하기 위한 비동기 프로그래밍에
  // 매우 강력한 도구다.
  // 그러나 async function을 활용하면 더욱 간단하게 해결책을 얻을 수 있다.
  // https://frontendmasters.com/courses/rethinking-async-js/callback-problems-inversion-of-control/

  // Generator 함수는 호출되어도 즉시 실행되지 않고, 대신 함수를 위한 Iterator 객체가 반환된다.
  // Iterator의 next() 메서드를 호출하면
  // Generator 함수가 실행되어
  // yield 문을 만날 때까지 진행하고, 해당 표현식이 명시하는 Iterator로 부터 반환값을 반환한다.

  it('Generator 함수는 호출되어도 즉시 실행되지 않고, 대신 함수를 위한 Iterator 객체가 반환된다.', () => {
    function* idMaker() {
      var index: number = 0;
      while (index < 3) yield index++;
    }

    var gen: Generator<number, void, unknown> = idMaker();

    expect(gen.next().value).toEqual(0);
    expect(gen.next().value).toEqual(1);
    expect(gen.next().value).toEqual(2);
    expect(gen.next().value).toEqual(undefined);
  });

  it('yield* 표현식을 마주칠 경우, 다른 Generator 함수가 위임되어 진행된다.', () => {
    function* anotherGenerator(i: number) {
      yield i + 1;
      yield i + 2;
      yield i + 3;
    }

    function* generator(i: number) {
      yield i;
      yield* anotherGenerator(i);
      yield i + 10;
    }

    var gen: Generator<number, void, unknown> = generator(10);

    expect(gen.next().value).toEqual(10);
    expect(gen.next().value).toEqual(11);
    expect(gen.next().value).toEqual(12);
    expect(gen.next().value).toEqual(13);
    expect(gen.next().value).toEqual(20);
    expect(gen.next().value).toEqual(undefined);
  });

  it('generator에 인자값을 넘길 수 있다.', () => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const log = jest.spyOn(global.console, 'log');
    function* logGenerator() {
      console.log(0);
      console.log(1, yield);
      console.log(2, yield);
      console.log(3, yield);
    }

    var gen: Generator<0 | undefined, void, unknown> = logGenerator();

    gen.next();
    expect(log).toHaveBeenCalledWith(0);

    gen.next('pretzel');
    expect(log).toHaveBeenCalledWith(1, 'pretzel');

    gen.next('california');
    expect(log).toHaveBeenCalledWith(2, 'california');

    gen.next('mayonnaise');
    expect(log).toHaveBeenCalledWith(3, 'mayonnaise');

    expect(gen.next().done).toBeTruthy();
  });

  it('return은 generator를 종료시킨다. 값이 반환되면 generator 객체의 value가 된다.', () => {
    function* yieldAndReturn() {
      yield 'Y';
      return 'R';
      // eslint-disable-next-line no-unreachable
      yield 'unreachable';
    }
    var genGenerator: Generator<'Y' | 'unreachable', string, unknown> = yieldAndReturn();
    expect(genGenerator.next()).toEqual({ value: 'Y', done: false });
    expect(genGenerator.next()).toEqual({ value: 'R', done: true }); // return후 종료되었다.
    expect(genGenerator.next()).toEqual({ value: undefined, done: true });
  });

  it('generator는 object의 property가 될 수 있다.', () => {
    const someObj: { generator(): Generator<'a' | 'b', void, unknown> } = {
      *generator() {
        yield 'a';
        yield 'b';
      },
    };
    const gen: Generator<'a' | 'b', void, unknown> = someObj.generator();
    expect(gen.next()).toEqual({ value: 'a', done: false });
    expect(gen.next()).toEqual({ value: 'b', done: false });
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  it('generator는 object method가 될 수 있다.', () => {
    class Foo {
      *generator() {
        yield 1;
        yield 2;
        yield 3;
      }
    }

    const f: Foo = new Foo();
    const gen: Generator<1 | 2 | 3, void, unknown> = f.generator();

    expect(gen.next()).toEqual({ value: 1, done: false });
    expect(gen.next()).toEqual({ value: 2, done: false });
    expect(gen.next()).toEqual({ value: 3, done: false });
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  it('계산된 속성에 generator', () => {
    class Foo {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
      }
    }

    const SomeObj: {
      [Symbol.iterator](): Generator<'a' | 'b', void, unknown>;
    } = {
      *[Symbol.iterator]() {
        yield 'a';
        yield 'b';
      },
    };

    expect(Array.from(new Foo())).toEqual([1, 2]);
    expect(Array.from(SomeObj)).toEqual(['a', 'b']);
  });

  it('generator는 생성자 함수가 될 수 없당', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function* f() {}
    // eslint-disable-next-line @typescript-eslint/typedef
    // expect(() => { var obj = new f }).toThrow(toThrow);
  });

  it('함수 표현식으로 정의하기', () => {
    const foo: () => Generator<10 | 20, void, unknown> = function* () {
      yield 10;
      yield 20;
    };

    const bar: Generator<10 | 20, void, unknown> = foo();

    expect(bar.next()).toEqual({ value: 10, done: false });
  });

  it('generator 예제', () => {
    const array: number[] = [];
    function* powers(n: number): Generator<number, void, unknown> {
      // 끝이 없는 generate 루프
      for (let current: number = n; ; current *= n) {
        yield current;
      }
    }

    for (let power of powers(2)) {
      // 🤔let에 바로 value가 꽂히넹..
      // generator 컨트롤
      if (power > 32) break;
      array.push(power);
    }

    expect(array).toEqual([2, 4, 8, 16, 32]);
  });
});
