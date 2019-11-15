/* global tvChart */
const updatePosition = require('../updatePosition');
const db = require('../../../lib/db');
const { lineType } = require('../../../const');

jest.mock('../../../lib/db');

const positionId = 1;

const remove = jest.fn();
db.get.mockImplementation(() => ({
  data: {
    id: positionId,
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

const { POSITION_LINE } = lineType;

let mockTvChart;
let tvUtil;

describe('updatePosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    db.get.mockClear();
    remove.mockClear();
    tvUtil = {
      position: { add: jest.fn().mockImplementation(() => mockTvChart) },
      tvChart: mockTvChart,
    };
  });

  it(`should return error`, () => {
    remove.mockImplementationOnce(() => {
      throw Error('Test error');
    });
    const positionUpdate = {
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
    const result = updatePosition(tvUtil, db, null, positionId, positionUpdate);
    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should update a position`, () => {
    const positionUpdate = {
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

    const expectedUpdatedPosition = {
      data: {
        id: positionId,
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

    const result = updatePosition(tvUtil, db, null, positionId, positionUpdate);
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith(positionId, POSITION_LINE);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(tvUtil.position.add).toHaveBeenCalledWith(expectedUpdatedPosition);
    expect(result).toBe(mockTvChart);
  });
});
