/* global tvChart */
const { Subject } = require('rxjs');
const deleteOrder = require('../deleteOrder');
const addOrder = require('../addOrder');
const db = require('../../../lib/db');

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart;

let tvUtil;

describe('deleteOrder function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    tvUtil = {
      tvChart: mockTvChart,
    };
  });

  it(`should delete an order`, () => {
    const onInteraction$ = new Subject();
    addOrder(tvUtil, db, onInteraction$, {
      data: {
        id: 1,
        price: 1,
        quatity: 1,
      },
    });
    const orderId = 1;
    const result = deleteOrder(tvUtil, db, onInteraction$, orderId);
    expect(result).toBe(true);
    expect(mockTvChart.remove).toHaveBeenCalledTimes(1);
  });
});
