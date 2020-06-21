describe('async function', () => {
  // async function은 async 키워드와 함께 정의된다.
  // AsyncFunction 생성자의 인스턴트 이다.
  // promise chain을 명시적으로 구성할 필요가 없다.
  // return 값은 promise이다.
  // async 함수에 의해 반환되는 값으로 resolved 깂이나, rejected 깂

  // async function은 await문을 0개 이상 포함할 수 있다.

  function resolveAfter2Second(): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve('slow');
      }, 2000);
    });
  }

  function resolveAfter1Second(): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve('fast');
      }, 2000);
    });
  }

  it('async 함수안에 반환값이 명시적으로 promise가 아닐경우, promise로 wrapping 한다.', async () => {
    const test: () => Promise<number> = async () => 1;

    await expect(test()).resolves.toBe(1);
  });

  xit('await 표현식은 then의 callback의 반환값으로 생각할 수 있다.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const test: () => Promise<number> = async () => { await 1 };
    // await 1은
    // return Promise.resolve(1).then(() => undefined) 와 같다.
    // 반환값은 chain의 최종 link를 형성한다.
    // await expect(test()).resolves.toBe(undefined);
  });

  it('함수 실행에 await을 붙일 경우 순차적으로 실행된다', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function sequentialStart(callback: any) {
      const slow: unknown = await resolveAfter2Second();
      const fast: unknown = await resolveAfter1Second();

      callback && callback();
    }
  });
});
