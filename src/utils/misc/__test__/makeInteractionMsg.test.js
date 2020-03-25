const makeIntercationMsg = require('../makeInteractionMsg');

const timestamp = new Date('2019-05-14T11:01:58.135Z').getTime();
describe('makeIntercationMsg function', () => {
  it(`should make a message`, () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => timestamp);
    const order = { id: 1 };
    const msg = makeIntercationMsg('addOrder', order);

    expect(msg).toEqual({ type: 'addOrder', line: { ...order }, timestamp });
    jest.spyOn(global.Date, 'now').mockRestore();
  });
});
