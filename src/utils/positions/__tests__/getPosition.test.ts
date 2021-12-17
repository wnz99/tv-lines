/* global tvChart */
import { Subject } from 'rxjs';

import getPosition from '../getPosition';
import addPosition from '../addPosition';
import db from '../../../lib/db';
import { OrderLineMethods, TvUtil, InteractionMsg } from '../../../types';

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart: any;

let tvUtil: TvUtil;

declare global {
  function tvChart(): OrderLineMethods;
  function getPrice(): jest.Mocked<number>;
}

describe('getPosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    tvUtil = {
      tvChart: mockTvChart,
    } as TvUtil;
  });

  it(`should get a position if exists`, () => {
    const onInteraction$ = new Subject<InteractionMsg>();
    const position = {
      data: {
        id: '1',
        price: 1,
        quantity: '1',
      },
      style: {},
    };

    addPosition(tvUtil, db, onInteraction$, position);

    const result = getPosition(tvUtil, db, onInteraction$, position.data.id);

    expect(result?.data).toEqual(position.data);
  });

  it(`should return undefined if position does not exist`, () => {
    const onInteraction$ = new Subject<InteractionMsg>();
    const result = getPosition(tvUtil, db, onInteraction$, '123');
    expect(result).toBe(undefined);
  });
});
