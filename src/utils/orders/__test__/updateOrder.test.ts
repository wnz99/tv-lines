import { Subject } from 'rxjs';

import updateOrder from '../updateOrder';
import db, { Db } from '../../../lib/db';
import {
  LineType,
  TvLines,
  InteractionMsg,
  IOrderLineAdapter,
} from '../../../types';

jest.mock('../../../lib/db');

declare global {
  function tvChart(): IOrderLineAdapter;
  function getPrice(): jest.Mocked<number>;
}

const orderId = '1';

const remove = jest.fn();

const add = jest.fn();

const mockDb = db as jest.Mocked<Db>;

const mockTvUtil = global.tvChart() as IOrderLineAdapter;

mockTvUtil.remove = remove;

mockDb.get.mockImplementation(() => ({
  data: {
    id: orderId,
    price: 10,
    quantity: '100',
  },
  style: {
    extendLeft: true,
    lineLength: 4,
    lineStyle: 5,
    lineWidth: 6,
  },

  tvLine: mockTvUtil,
}));

const { ORDER_LINE } = LineType;

let mockTvChart: any;

let tvUtil: TvLines;

let onInteraction$: Subject<InteractionMsg>;

describe('updateOrder function', () => {
  beforeEach(() => {
    onInteraction$ = new Subject<InteractionMsg>();
    mockTvChart = global.tvChart() as IOrderLineAdapter;
    mockDb.get.mockClear();
    remove.mockClear();
    add.mockClear();
    tvUtil = {
      order: { add: add.mockImplementation(() => mockTvChart) },
      position: {},
      tvChart: mockTvChart,
      isBrowser: true,
      interactions$: onInteraction$,
    } as unknown as TvLines;
  });

  it(`should return error`, () => {
    remove.mockImplementationOnce(() => {
      throw Error('Test error');
    });

    const orderUpdate = {
      data: {
        price: 40,
        quantity: '2000',
      },
      style: {
        extendLeft: false,
        lineStyle: 7,
        lineWidth: 8,
      },
    };
    const result = updateOrder(tvUtil, db, onInteraction$, {
      id: orderId,
      update: orderUpdate,
    });

    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should update an order`, () => {
    const orderUpdate = {
      data: {
        price: 40,
        quantity: '2000',
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
        quantity: '2000',
      },
      style: {
        extendLeft: false,
        lineLength: 4,
        lineStyle: 7,
        lineWidth: 8,
      },
    };

    const result = updateOrder(tvUtil, db, onInteraction$, {
      id: orderId,
      update: orderUpdate,
    });
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith(orderId, ORDER_LINE);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(tvUtil.order.add).toHaveBeenCalledWith(expectedUpdatedOrder);
    expect(result).toBe(mockTvChart);
  });
});
