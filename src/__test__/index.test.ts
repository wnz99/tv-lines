import tvOrdersUtil from '../index';

import { TvChart } from '../types';

const tvWidget = () => undefined;

describe('tvGraphUtil function', () => {
  it(`should detect if running in browser`, () => {
    const tvOrders = tvOrdersUtil(tvWidget as unknown as TvChart);

    expect(tvOrders.isBrowser).toBe(true);
  });
});
