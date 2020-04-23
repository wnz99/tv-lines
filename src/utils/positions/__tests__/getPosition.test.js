/* global tvChart */
const { Subject } = require('rxjs');
const getPosition = require('../getPosition');
const addPosition = require('../addPosition');
const db = require('../../../lib/db');

jest.mock('../../misc/makeInteractionMsg');

let mockTvChart;

let tvUtil;

describe('getPosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    tvUtil = {
      tvChart: mockTvChart,
    };
  });

  it(`should get a position if exists`, () => {
    const onInteraction$ = new Subject();
    const position = {
      data: {
        id: 1,
        price: 1,
        quatity: 1,
      },
    };

    addPosition(tvUtil, db, onInteraction$, position);

    const result = getPosition(tvUtil, db, onInteraction$, position.data.id);
    expect(result.data).toEqual(position.data);
  });

  it(`should return undefined if position does not exist`, () => {
    const onInteraction$ = new Subject();
    const result = getPosition(tvUtil, db, onInteraction$, 123);
    expect(result).toBe(undefined);
  });
});
