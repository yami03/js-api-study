// https://devdocs.io/javascript/global_objects/number/tolocalestring
describe('toLocaleString', () => {
  const number: 123456.789 = 123456.789;

  it('이 숫자의 사용 언어에 따른 표현을 포함된 문자열을 반환해야 한다.', () => {
    expect(number.toLocaleString('ar-EG')).toEqual('١٢٣٬٤٥٦٫٧٨٩');
    expect(number.toLocaleString('zh-Hans-CN-u-nu-hanidec')).toEqual('一二三,四五六.七八九');
  });

  // https://www.science.co.il/language/Locale-codes.php 참조
  it('parameter인 locales(string)를 생략하면 웹브라우저의 기본 Locale 값을 사용해야 한다.', () => {
    expect(number.toLocaleString()).toEqual('123,456.789');
  });

  it('독일어는 쉼표를 십진수 구분 기호 및 마침표로 사용해야 한다.', () => {
    expect(number.toLocaleString('de-DE')).toEqual('123.456,789');
  });

  it('대부분의 아랍어 국가에서 아랍어는 동부 아랍어 숫자를 사용해야 한다.', () => {
    expect(number.toLocaleString('ar-EG')).toEqual('١٢٣٬٤٥٦٫٧٨٩');
  });

  it('인도는 thousands/lakh/crore 구분 기호를 사용해야 한다', () => {
    expect(number.toLocaleString('en-IN')).toEqual('1,23,456.789');
  });

  it('nu 확장키는 numbering system을 요청해야 한다(e.g. Chinese decimal)', () => {
    expect(number.toLocaleString('zh-Hans-CN-u-nu-hanidec')).toEqual('一二三,四五六.七八九');
  });

  it('발리말과 같이 지원되지 않을 수 있는 언어를 요청할 때, 인도네시아어의 대체 언어를 포함해야 한다', () => {
    expect(number.toLocaleString(['ban', 'id'])).toEqual('123.456,789');
  });

  // using options
  /*
   * style
   * The formatting style to use,
   * "decimal" default style, 일반숫자
   * "currency" 통화 형식 "USD"미국 달러, "EUR"유로, "CNY"중국 위안 같은 ISO 4217 currency codes
   * "percent" 백분율 형식
   */

  /*
   * currency
   * 통 화형식에 사용할 통화
   */
  it('통화형식에 사용할 통화, style 속성을 currency로 해야한다.', () => {
    // German - Germany
    expect(number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })).toEqual('123.456,79 €');
    expect(number.toLocaleString('de-DE', { currency: 'EUR' })).toEqual('123.456,789');
  });

  it('한국 원화는  minor unit을 사용하지 않는다', () => {
    expect(number.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })).toEqual('₩123,457');
  });

  it('maximumSignificantDigits는 사용할 최대 유효 자릿수이며 가능한 값은 1~12이다.', () => {
    // English - India
    expect(number.toLocaleString('en-IN', { maximumSignificantDigits: 2 })).toEqual('1,20,000');
    expect(number.toLocaleString('en-IN', { maximumSignificantDigits: 3 })).toEqual('1,23,000');
    expect(number.toLocaleString('en-IN', { maximumSignificantDigits: 4 })).toEqual('1,23,500');
  });

  /*
   * minimumFractionDigits: 사용할 최소 소수 자릿수, 사용 가능한 값은 0~20사이의 값이다. 기본값은 0
   */
  it('host default language와 number formatting 옵션 같이 사용할 수 있다.', () => {
    expect(number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual(
      '123,456.79',
    );
    expect(number.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual(
      '123,456.79',
    );
    expect(number.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual(
      '123,456.79',
    );
  });
});
