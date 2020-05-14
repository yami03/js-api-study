describe('toLocaleString', () => {
  it('이 숫자의 사용 언어에 따른 표현을 포함된 문자열을 반환해야 한다.', () => {
    expect((123456.789).toLocaleString('ar-EG')).toEqual('١٢٣٬٤٥٦٫٧٨٩');
    expect((123456.789).toLocaleString('zh-Hans-CN-u-nu-hanidec')).toEqual('一二三,四五六.七八九');
    expect((123456.789).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })).toEqual('₩123,457');
  });

  it('locales를 생략하면 웹브라우저의 기본 Locale 값을 사용해야 한다.', () => {
    expect((123456.789).toLocaleString()).toEqual('123,456.789');
  });

  it('독일어는 쉼표를 십진수 구분 기호 및 마침표로 사용해야 한다.', () => {
    expect((123456.789).toLocaleString('de-DE')).toEqual('123.456,789');
  });

  it('대부분의 아랍어 국가에서 아랍어는 동부 아랍어 숫자를 사용해야 한다.', () => {
    expect((123456.789).toLocaleString('ar-EG')).toEqual('١٢٣٬٤٥٦٫٧٨٩');
  });

  it('인도는 thousands/lakh/crore 구분 기호를 사용해야 한다', () => {
    expect((123456.789).toLocaleString('en-IN')).toEqual('1,23,456.789');
  });

  it('nu 확장키는 numbering system을 요청해야 한다(e.g. Chinese decimal)', () => {
    expect((123456.789).toLocaleString('zh-Hans-CN-u-nu-hanidec')).toEqual('一二三,四五六.七八九');
  });

  it('발리말과 같이 지원되지 않을 수 있는 언어를 요청할 때, 인도네시아어의 대체 언어를 포함해야 한다', () => {
    expect((123456.789).toLocaleString(['ban', 'id'])).toEqual('123.456,789');
  });
});
