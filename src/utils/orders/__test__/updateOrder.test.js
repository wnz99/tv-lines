/* global tvChart */
const updateOrder = require('../updateOrder');
const db = require('../../../lib/db');
const { lineType } = require('../../../const');

jest.mock('../../../lib/db');

const orderId = 1;

const remove = jest.fn();
db.get.mockImplementation(() => ({
  data: {
    id: orderId,
    price: 10,
    quantity: 100,
  },
  style: {
    extendLeft: true,
    lineLength: 4,
    lineStyle: 5,
    lineWidth: 6,
  },
  tvLine: {
    remove,
  },
}));

const { ORDER_LINE } = lineType;

let mockTvChart;
let tvUtil;

describe('updateOrder function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    db.get.mockClear();
    remove.mockClear();
    tvUtil = {
      order: { add: jest.fn().mockImplementation(() => mockTvChart) },
      tvChart: mockTvChart,
    };
  });

  it(`should return error`, () => {
    remove.mockImplementationOnce(() => {
      throw Error('Test error');
    });
    const orderUpdate = {
      data: {
        price: 40,
        quantity: 2000,
      },
      style: {
        extendLeft: false,
        lineStyle: 7,
        lineWidth: 8,
      },
    };
    const result = updateOrder(tvUtil, db, null, orderId, orderUpdate);
    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should update an order`, () => {
    const orderUpdate = {
      data: {
        price: 40,
        quantity: 2000,
      },
      style: {
        extendLeft: false,
        lineStyle: 7,
        lineWidth: 8,
      },
    };

    const expectedUpdatedOrder = {
      data: {
        id: orderId,
        price: 40,
        quantity: 2000,
      },
      style: {
        extendLeft: false,
        lineLength: 4,
        lineStyle: 7,
        lineWidth: 8,
      },
    };

    const result = updateOrder(tvUtil, db, null, orderId, orderUpdate);
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith(orderId, ORDER_LINE);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(tvUtil.order.add).toHaveBeenCalledWith(expectedUpdatedOrder);
    expect(result).toBe(mockTvChart);
  });
});
