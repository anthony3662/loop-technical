const { getNextPageInfoParam } = require('./getNextPageInfoParam');
describe('getNextPageInfoParam.test.js', () => {
  it('gets page_info param for the next and previous pages', () => {
    const testData = `<https://universe-of-birds.myshopify.com/admin/api/2020-04/orders.json?page_info=eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6MTg2MzU5MDExNzQ3OCwibGFzdF92YWx1ZSI6IjIwMTktMTEtMTMgMjA6MjI6NDguMDAwMDAwIn0>; rel="previous", <https://universe-of-birds.myshopify.com/admin/api/2020-04/orders.json?page_info=eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6ODExOTc2OTE3MDk0LCJsYXN0X3ZhbHVlIjoiMjAxOS0wMi0xMyAwMTowMjowMS4wMDAwMDAifQ>; rel="next"`;
    const output = getNextPageInfoParam(testData);
    expect(output).toEqual({
      next: 'eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6ODExOTc2OTE3MDk0LCJsYXN0X3ZhbHVlIjoiMjAxOS0wMi0xMyAwMTowMjowMS4wMDAwMDAifQ',
      previous: 'eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6MTg2MzU5MDExNzQ3OCwibGFzdF92YWx1ZSI6IjIwMTktMTEtMTMgMjA6MjI6NDguMDAwMDAwIn0',
    });
  });

  it('should behave appropriately when only previous link is present', () => {
    const testData = `<https://universe-of-birds.myshopify.com/admin/api/2020-04/orders.json?page_info=eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6ODExMTY4NzI3MTQyLCJsYXN0X3ZhbHVlIjoiMjAxOS0wMi0xMiAwODowMTo1OC4wMDAwMDAifQ>; rel="previous"`;
    const output = getNextPageInfoParam(testData);
    expect(output).toEqual({
      next: null,
      previous: 'eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6ODExMTY4NzI3MTQyLCJsYXN0X3ZhbHVlIjoiMjAxOS0wMi0xMiAwODowMTo1OC4wMDAwMDAifQ',
    });
  });

  it('should behave appropriately when only next link is present', () => {
    const testData = `<https://universe-of-birds.myshopify.com/admin/api/2020-04/orders.json?page_info=eyJsYXN0X2lkIjoxODYzNjAwNDcyMTY2LCJsYXN0X3ZhbHVlIjoiMjAxOS0xMS0xMyAyMDozMDowMC4wMDAwMDAiLCJkaXJlY3Rpb24iOiJuZXh0In0>; rel="next"`;
    const output = getNextPageInfoParam(testData);
    expect(output).toEqual({
      next: 'eyJsYXN0X2lkIjoxODYzNjAwNDcyMTY2LCJsYXN0X3ZhbHVlIjoiMjAxOS0xMS0xMyAyMDozMDowMC4wMDAwMDAiLCJkaXJlY3Rpb24iOiJuZXh0In0',
      previous: null,
    });
  });
});
