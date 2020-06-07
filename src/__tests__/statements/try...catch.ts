describe('try...catch', () => {
  // try...catch문장은 시도할 문장 블록을 표시하고, 예외가 발생 했을 때의 응답을 지정한다.

  // try 선언의 구성은 catch나 finally 항목 중 최소한 하나는 포함하고 있어야한다.
  // 그렇기 때문에 try 선언에는 3가지 형식이 존재한다.
  // 1. try...catch
  // 2. try...finally
  // 3. try...catch...finally

  // finally는 try블록과 catch 절 다음으로 실행된다.
  // throw 혹은 catch 여부에 관계없이 무조건 실행된다.

  // 하나 이상의 try문을 중첩시킬 수 있다.
  // 내부 try 문에 catch문이 없으면, 둘러싼 try 문에 catch절이 입력된다.
  it('무조건적 catch block', () => {
    // catch block은 try문에 예외가 발생됐을 때 실행된다.
    try {
      // eslint-disable-next-line no-throw-literal
      throw 'myException'; // 예외를 발생시키다.
    } catch (e) {
      // 캐치 블록은 예외 값을 보유하는 식별자(위의 예에서 e)를 지정하며, 이 값은 캐치 블록의 범위에서만 사용할 수 있다.
      expect(e).toEqual('myException');
    }
  });

  it('조건별 catch block', () => {
    try {
      // something
    } catch (e) {
      if (e instanceof TypeError) return expect(e).toThrow(TypeError);
      if (e instanceof RangeError) return expect(e).toThrow(RangeError);
      if (e instanceof EvalError) return expect(e).toThrow(EvalError);
      // 지정되지 않은 예외를 처라
      return expect(e).toThrow(e);
    }
  });

  it('예외 식별자', () => {
    // 식별자는 catch block안에서만 사용할 수 잇다.
    function isValidString(text: string) {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    }
    expect(isValidString('[1, 5, "false"]')).toEqual(true);
    expect(isValidString('{"foo" : 1, }')).toEqual(false);
  });

  it('finally 절', () => {
    let isOpen: boolean = false;
    try {
      // do something
      // try_statements 실행될 선언들
      isOpen = true;
    } finally {
      // finally_statements
      // try 선언이 완료된 이후에 실행된 선언들. 이 선언들은 예외 발생 여부와 상관없이 실행된다.
      isOpen = false;
    }

    expect(isOpen).toEqual(false); // 언제나 false가 나온다.
  });

  it('중첩된 try block', () => {
    const consoleTest: string[] = [];

    try {
      try {
        throw new Error('oops');
      } finally {
        consoleTest.push('finally');
      }
    } catch (ex) {
      consoleTest.push('outer ' + ex.message);
    }

    // 내장된 finally부터 실행되고 그 후 바깥에 있는 catch문이 실행된다.
    expect(consoleTest).toEqual(['finally', 'outer oops']);
  });

  it('예외는 다시 발생하지 않는 한 가장 가까운 곳에 있는 catch block에 의해 단 한 번만 실행된다.', () => {
    const consoleTest: string[] = [];

    try {
      try {
        throw new Error('oops');
      } catch (ex) {
        consoleTest.push('inner ' + ex.message);
      } finally {
        consoleTest.push('finally');
      }
    } catch (ex) {
      consoleTest.push('outer ' + ex.message);
    }

    expect(consoleTest).toEqual(['inner oops', 'finally']);
  });

  it('예외를 다시 던지쟈', () => {
    const consoleTest: string[] = [];

    try {
      try {
        throw new Error('oops');
      } catch (ex) {
        consoleTest.push('inner ' + ex.message);
        throw ex;
      } finally {
        consoleTest.push('finally');
      }
    } catch (ex) {
      consoleTest.push('outer ' + ex.message);
    }

    expect(consoleTest).toEqual(['inner oops', 'finally', 'outer oops']);
  });

  it('finally block에서 return을 하면, try-block, catch-block의 return 문과 관계없이 그 값이 try-catch-finally 전체의 반환값이 된다.', () => {
    const consoleTest: string[] = [];
    (function () {
      try {
        try {
          throw new Error('oops');
        } catch (ex) {
          consoleTest.push('inner ' + ex.message);
          throw ex;
        } finally {
          consoleTest.push('finally');
          return;
        }
      } catch (ex) {
        consoleTest.push('outer ' + ex.message); // 실행되지 않는다.
      }
    })();

    expect(consoleTest).toEqual(['inner oops', 'finally']);
  });
});
