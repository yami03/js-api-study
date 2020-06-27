describe('async function', () => {
  // async function은 async 키워드와 함께 정의된다.
  // AsyncFunction 생성자의 인스턴트 이다.
  // promise chain을 명시적으로 구성할 필요가 없다.
  // return 값은 promise이다.
  // async 함수에 의해 반환되는 값으로 resolved 깂이나, rejected 깂
  // async function은 await문을 0개 이상 포함할 수 있다.
  function resolveAfter2Second(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve('slow');
      }, 2000);
    });
  }

  function resolveAfter1Second(): Promise<string> {
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

  it('함수 실행에 await을 붙일 경우 직렬로 실행된다', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: string[] = [];
    result.push(await resolveAfter2Second()); // 2초
    result.push(await resolveAfter1Second()); // 1초
    expect(result).toEqual(['slow', 'fast']); // 총 3초가 걸린다.
  });

  it('함수 실행에 await을 붙이지 않는다면 병렬로 실행된다', async () => {
    const result: string[] = [];
    // 동시에 실행된다.
    const slow: Promise<string> = resolveAfter2Second();
    const fast: Promise<string> = resolveAfter1Second();
    // slow는 promise 타입이지만 await를 붙이면 then 다음과 같다. 😊
    result.push(await slow);
    result.push(await fast); // 2초후 완료된다.
    expect(result).toEqual(['slow', 'fast']);
  });

  it('Promise.all은 병렬로 실행된다', async () => {
    let results: string[] = await Promise.all([resolveAfter2Second(), resolveAfter1Second()]).then((messages) => {
      return messages;
    });
    expect(results).toEqual(['slow', 'fast']);
  });

  it('각각의 함수에서 await을 쓸 경우 병렬로 실행된다.', async () => {
    let results: string[] = await Promise.all([
      // 즉시실행 사용
      (async () => await resolveAfter2Second())(),
      (async () => await resolveAfter1Second())(),
    ]).then((messages) => {
      return messages;
    });
    expect(results).toEqual(['slow', 'fast']);
  });

  // 병렬을 안전하게 실행하고 싶다면 Promise.all, or Promise.allSettled을 쓴다.
  // promise.all 병렬실행과 await 병렬 실행은 차이가 있다.
  // await은 첫번째 완료가 rejection error가 발생한다면 catch문의 조성 유무와 상관없이
  // 처리되지 않은 2번째는 오류가 발생된다.
  // promise.all은 설정된 promise chain내에서 오류가 항상 발생하여 정상적인 방법으로 잡을 수 있다.

  xit('async await에서는 try...catch문을 이용해 예외처리를 한다', () => {
    /*
    async function getProcessedData(url: string) {
      let v
      try { 
        v = await downloadData(url)
      } catch(e) {
        v = await downloadFallbackData(url)
      }
      return processDataInWorker(v)
    }
    */
    // return에 await이 없는 이유는 aysnc함수는 암묵적으로 Promise.resolve로 감싸서 반환하기 때문이다.ㅎ
    // 만약
    /*
    try {
      return await processDataInworker(v)
    } catch (e) {
      return null // null이 사용되는게 아니라 Promise function reject가 반환된다.
    }
    */
    /* foo와 return await foo의 차이 */
    /*
     * foo는 즉시 foo를 반환하지 promise reject를 반환할 일이 없다.
     * return aawait foo는 reject나 resolve를 기다릴 것이고
     * 만약 reject라면 returnning 하기전에 throw 할 것이다.
     */
    // https://stackoverflow.com/questions/42453683/how-to-reject-in-async-await-syntax
  });
});
