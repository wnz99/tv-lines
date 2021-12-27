import { Subject } from 'rxjs';

import deletePosition from '../deletePosition';
import addPosition from '../addPosition';
import db from '../../../lib/db';
import { TvLines, InteractionMsg, IOrderLineAdapter } from './../../../types';

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart: any;

let tvUtil: TvLines;

declare global {
  function tvChart(): IOrderLineAdapter;
  function getPrice(): jest.Mocked<number>;
}

describe('deletePosition function', () => {
  beforeEach(() => {
    mockTvChart = global.tvChart() as unknown as IOrderLineAdapter;
    tvUtil = {
      tvChart: mockTvChart,
    } as TvLines;
  });

  it(`should delete a position`, () => {
    const onInteraction$ = new Subject<InteractionMsg>();
    addPosition(tvUtil, db, onInteraction$, {
      data: {
        id: '1',
        price: 1,
        quantity: '1',
      },
      style: {},
    });
    const positionId = '1';
    const result = deletePosition(tvUtil, db, onInteraction$, positionId);
    expect(result).toBe(true);
    expect(mockTvChart.remove).toHaveBeenCalledTimes(1);
  });
});
