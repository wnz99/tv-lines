/* global tvChart */
import { Subject } from 'rxjs';

import updatePosition from '../updatePosition';
import db, { Db } from '../../../lib/db';
import {
  LineType,
  OrderLineMethods,
  TvLines,
  InteractionMsg,
} from '../../../types';

jest.mock('../../../lib/db');

const positionId = '1';

declare global {
  function tvChart(): OrderLineMethods;
  function getPrice(): jest.Mocked<number>;
}

const remove = jest.fn();

const mockDb = db as jest.Mocked<Db>;

const mockTvUtil = global.tvChart() as OrderLineMethods;

mockTvUtil.remove = remove;

mockDb.get.mockImplementation(() => ({
  data: {
    id: positionId,
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

const { POSITION_LINE } = LineType;

let mockTvChart: any;

let tvUtil: TvLines;

let onInteraction$: Subject<InteractionMsg>;

describe('updatePosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    mockDb.get.mockClear();
    remove.mockClear();
    tvUtil = {
      order: {},
      position: { add: jest.fn().mockImplementation(() => mockTvChart) },
      tvChart: mockTvChart,
      isBrowser: true,
      interactions$: onInteraction$,
    } as unknown as TvLines;
  });

  it(`should return error`, () => {
    remove.mockImplementationOnce(() => {
      throw Error('Test error');
    });
    const positionUpdate = {
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
    const result = updatePosition(tvUtil, db, onInteraction$, {
      id: positionId,
      update: positionUpdate,
    });
    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should update a position`, () => {
    const positionUpdate = {
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

    const expectedUpdatedPosition = {
      data: {
        id: positionId,
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

    const result = updatePosition(tvUtil, db, onInteraction$, {
      id: positionId,
      update: positionUpdate,
    });
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith(positionId, POSITION_LINE);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(tvUtil.position.add).toHaveBeenCalledWith(expectedUpdatedPosition);
    expect(result).toBe(mockTvChart);
  });
});
