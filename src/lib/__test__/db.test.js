const md5 = require('md5');
const db = require('../db');

const tvLine = () => {};

describe('tvUtil function', () => {
  it(`should add orders`, () => {
    const orders = [{ id: 1, price: 1 }, { id: 2, price: 2 }];
    const ordersStyles = [{ color1: 1, color2: 1 }, { color1: 2, color2: 2 }];

    db.add(orders[0], ordersStyles[0], tvLine);
    db.add(orders[1], ordersStyles[1], tvLine);
    expect(db.db.get(md5(orders[0].id))).toEqual({
      data: orders[0],
      style: ordersStyles[0],
      tvLine,
    });
    expect(db.db.get(md5(orders[1].id))).toEqual({
      data: orders[1],
      style: ordersStyles[1],
      tvLine,
    });
    expect(db.get(orders[0].id)).toEqual({
      data: orders[0],
      style: ordersStyles[0],
      tvLine,
    });
    expect(db.get(orders[1].id)).toEqual({
      data: orders[1],
      style: ordersStyles[1],
      tvLine,
    });
  });

  it(`should delete order if exists`, () => {
    const orders = [{ id: 1, price: 1 }, { id: 2, price: 2 }];
    let result = db.del(orders[0].id);
    expect(result).toBe(true);
    result = db.del(orders[1].id);
    expect(result).toBe(true);
    expect(db.get(orders[0].id)).toEqual(undefined);
    expect(db.get(orders[1].id)).toEqual(undefined);
  });

  it(`should return false if try to delete order that does not exists`, () => {
    const result = db.del(10);
    expect(result).toBe(false);
  });
});
