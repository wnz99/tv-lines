import db from '../db';

import {
  LineType,
  LineStyle,
  OrderLineMethods,
  PositionLineMethods,
} from '../../types';

type TvLine = OrderLineMethods | PositionLineMethods;

const tvLine = jest.fn() as unknown as TvLine;

const { ORDER_LINE } = LineType;

const orders = [
  { id: '1', price: 1 },
  { id: '2', price: 2 },
];
const ordersStyles = [
  { color1: '1', color2: '1' } as LineStyle,
  { color1: '2', color2: '2' } as LineStyle,
];

describe('db function', () => {
  beforeEach(() => {
    db.db = new Map();
  });
  it(`should add orders`, () => {
    db.add(orders[0], ordersStyles[0], tvLine, ORDER_LINE);
    db.add(orders[1], ordersStyles[1], tvLine, ORDER_LINE);
    expect(db.db.get(orders[0].id + ORDER_LINE)).toEqual({
      data: orders[0],
      style: ordersStyles[0],
      tvLine,
    });
    expect(db.db.get(orders[1].id + ORDER_LINE)).toEqual({
      data: orders[1],
      style: ordersStyles[1],
      tvLine,
    });
    expect(db.get(orders[0].id, ORDER_LINE)).toEqual({
      data: orders[0],
      style: ordersStyles[0],
      tvLine,
    });
    expect(db.get(orders[1].id, ORDER_LINE)).toEqual({
      data: orders[1],
      style: ordersStyles[1],
      tvLine,
    });
  });

  it(`should delete order if exists`, () => {
    db.add(orders[0], ordersStyles[0], tvLine, ORDER_LINE);
    db.add(orders[1], ordersStyles[1], tvLine, ORDER_LINE);
    let result = db.del(orders[0].id, ORDER_LINE);
    expect(result).toBe(true);
    result = db.del(orders[1].id, ORDER_LINE);
    expect(result).toBe(true);
    expect(db.get(orders[0].id, ORDER_LINE)).toEqual(undefined);
    expect(db.get(orders[1].id, ORDER_LINE)).toEqual(undefined);
  });

  it(`should return false if try to delete order that does not exists`, () => {
    const result = db.del(10, ORDER_LINE);
    expect(result).toBe(false);
  });
});
