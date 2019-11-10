const tvOrdersUtil = require('../index');

const config = { onOrderInteraction: () => {} };

const tvWidget = () => {};

describe('tvGraphUtil function', () => {
  it(`should detect if running in browser`, () => {
    const tvOrders = tvOrdersUtil(tvWidget, config);
    expect(tvOrders.isBrowser).toBe(false);
  });
});
