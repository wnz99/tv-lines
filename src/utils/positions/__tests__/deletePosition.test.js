/* global tvChart */
const { Subject } = require('rxjs');
const deletePosition = require('../deletePosition');
const addPosition = require('../addPosition');
const db = require('../../../lib/db');

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart;

let tvUtil;

describe('deletePosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    tvUtil = {
      tvChart: mockTvChart,
    };
  });

  it(`should delete a position`, () => {
    const onInteraction$ = new Subject();
    addPosition(tvUtil, db, onInteraction$, {
      data: {
        id: 1,
        price: 1,
        quatity: 1,
      },
    });
    const oositionId = 1;
    const result = deletePosition(tvUtil, db, onInteraction$, oositionId);
    expect(result).toBe(true);
    expect(mockTvChart.remove).toHaveBeenCalledTimes(1);
  });
});
