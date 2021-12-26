import { Subject } from 'rxjs';

import deleteOrder from '../deleteOrder';
import addOrder from '../addOrder';
import db from '../../../lib/db';
import { TvLines, InteractionMsg, OrderLineMethods } from './../../../types';

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart: any;

let tvUtil: TvLines;

declare global {
  function tvChart(): OrderLineMethods;
  function getPrice(): jest.Mocked<number>;
}

describe('deleteOrder function', () => {
  beforeEach(() => {
    mockTvChart = global.tvChart() as unknown as OrderLineMethods;
    tvUtil = {
      tvChart: mockTvChart,
    } as TvLines;
  });

  it(`should delete an order`, () => {
    const onInteraction$ = new Subject<InteractionMsg>();
    addOrder(tvUtil, db, onInteraction$, {
      data: {
        id: '1',
        price: 1,
        quantity: '1',
      },
      style: {},
    });
    const orderId = '1';
    const result = deleteOrder(tvUtil, db, onInteraction$, orderId);
    expect(result).toBe(true);
    expect(mockTvChart.remove).toHaveBeenCalledTimes(1);
  });
});
