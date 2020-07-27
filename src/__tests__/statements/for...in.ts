describe('for...in', () => {
  // for...in문은 열거가능한 속성들을 나열한다.
  // 상속받은 열거가능한 속성도 포함이다.
  // Symbol은 무시된다.
  // Object는 built–in constructor로 부터 Array, Object가 만들어 진다.
  // 하지만 이것들은 non-enumerable property이다.
  // 임의의 순서로 순회한다.
  // 순서가 중요하다면 Map을 사용한다.
  // 순회하는 중 현재 순회중인 속성 외에 다른 속성을 추가, 수정, 삭제는 하지 않는게 좋다.
  // 왜냐면 순서가 보장되어있지 않기 때문에 순회중 포함될 수도?
  // 확장된 built-in prototype은 빼고 싶다면
  // getOwnPropertyNames(), hasOwnproperty(), propertyIsEnumerable()을 이용해 체크해야 한다.

  // for...in문을 써야하는 이유.
  // 1. 속성을 체크하기에 좋다. -> 디버깅 목적
  // 2. 해당 key중 특정 값을 가진 key가 있는지 확인하고 싶을 때

  it('상속받은 속성은 빼고 싶을 때', () => {
    let triangle: { a: 1; b: 2; c: 3 } = { a: 1, b: 2, c: 3 };

    function ColoredTriangle() {
      this.color = 'red';
    }

    ColoredTriangle.prototype = triangle;

    const obj: new () => void = new ColoredTriangle();

    for (const prop in obj) {
      // getOwnPropertyNames(), hasOwnproperty(), propertyIsEnumerable() 사용
      if (obj.hasOwnProperty(prop)) {
        expect(obj[prop]).toEqual('red');
      }
    }
  });
});
