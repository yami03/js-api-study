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
});
