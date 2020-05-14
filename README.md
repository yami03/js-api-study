# JS API Study

테스트 코드를 통해 MDN의 예시들을 실행해본다. 

## Start

```shell
# Run unit test (Jest)
`npm test`
```


# Source Import Sample

## Jest 
<!-- import src/__tests__/*.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_\_tests\_\_/sample.ts


```ts
describe('Sample', () => {
  test('Test', () => {
    expect('text').toEqual('text');
  });
});

```
