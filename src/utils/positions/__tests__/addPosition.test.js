/* global tvChart */
const { Subject } = require('rxjs');
const addPosition = require('../addPosition');
const db = require('../../../lib/db');
const makeInteractionMsg = require('../../misc/makeInteractionMsg');
const {
  interactionType,
  defaultPositionStyleProps,
  lineType,
} = require('../../../const');

jest.mock('../../../lib/db');
jest.mock('../../misc/makeInteractionMsg');
makeInteractionMsg.mockImplementation((type, position) => ({
  type,
  line: { ...position },
}));

db.get.mockImplementation(() => ({
  id: 1,
  price: 10,
}));

const { POSITION_LINE } = lineType;

const {
  ON_POSITION_ADD,
  ON_POSITION_CLOSE,
  ON_POSITION_MODIFY,
  ON_POSITION_REVERSE,
} = interactionType;

const {
  bodyFont,
  quantityFont,
  lineColor,
  bodyBorderColor,
  bodyBackgroundColor,
  bodyTextColor,
  quantityBorderColor,
  quantityBackgroundColor,
  quantityTextColor,
  reverseButtonBorderColor,
  reverseButtonBackgroundColor,
  reverseButtonIconColor,
  closeButtonBorderColor,
  closeButtonBackgroundColor,
  closeButtonIconColor,
} = defaultPositionStyleProps;

const positionStyle = {
  extendLeft: false,
  lineLength: 4,
  lineStyle: 5,
  lineWidth: 6,
};

const positionData = {
  id: 1,
  price: 10,
  quantity: 100,
  tooltip: 'Position tooltip',
  protectTooltip: 'Protect tooltip test',
  reverseTooltip: 'Reverse tooltip test',
  closeTooltip: 'Close tooltip test',
  text: 'STOP: 73.5 (5,64%)',
  interactions: ['onClose', 'onModify', 'onReverse'],
};

const position = { data: positionData, style: positionStyle };

let mockTvChart;

let tvUtil;

describe('addPosition function', () => {
  beforeEach(() => {
    mockTvChart = tvChart();
    tvUtil = {
      tvChart: mockTvChart,
    };
    db.get.mockClear();
    db.del.mockClear();
  });

  it(`should return error`, () => {
    const onInteraction$ = new Subject();
    mockTvChart.createPositionLine.mockImplementation(() => {
      throw Error('Test error');
    });
    const result = addPosition(tvUtil, db, onInteraction$, position);
    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should add a position`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      const expectedMessage = {
        type: ON_POSITION_ADD,
        line: {
          id: 1,
          price: 10,
        },
      };
      expect(message).toEqual(expectedMessage);
      done();
    });
    const {
      data: {
        price,
        quantity,
        tooltip,
        protectTooltip,
        reverseTooltip,
        closeTooltip,
        text,
      },
      style: { extendLeft, lineLength, lineStyle, lineWidth },
    } = position;
    const result = addPosition(tvUtil, db, onInteraction$, position);
    expect(result).toBe(mockTvChart);
    expect(mockTvChart.createPositionLine).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setPrice).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantity).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setText).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setProtectTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCloseTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setReverseTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onReverse).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onModify).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onClose).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setExtendLeft).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setLineLength).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setLineStyle).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setLineWidth).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setBodyFont).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantityFont).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setLineColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setBodyBorderColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setBodyBackgroundColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setBodyTextColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantityBorderColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantityBackgroundColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantityTextColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setReverseButtonBorderColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setReverseButtonBackgroundColor).toHaveBeenCalledTimes(
      1
    );
    expect(mockTvChart.setReverseButtonIconColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCloseButtonBorderColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCloseButtonBackgroundColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCloseButtonIconColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setPrice).toHaveBeenCalledWith(price);
    expect(mockTvChart.setQuantity).toHaveBeenCalledWith(quantity);
    expect(mockTvChart.setText).toHaveBeenCalledWith(text);
    expect(mockTvChart.setProtectTooltip).toHaveBeenCalledWith(protectTooltip);
    expect(mockTvChart.setCloseTooltip).toHaveBeenCalledWith(closeTooltip);
    expect(mockTvChart.setReverseTooltip).toHaveBeenCalledWith(reverseTooltip);
    expect(mockTvChart.setTooltip).toHaveBeenCalledWith(tooltip);
    expect(mockTvChart.setExtendLeft).toHaveBeenCalledWith(extendLeft);
    expect(mockTvChart.setLineLength).toHaveBeenCalledWith(lineLength);
    expect(mockTvChart.setLineStyle).toHaveBeenCalledWith(lineStyle);
    expect(mockTvChart.setLineWidth).toHaveBeenCalledWith(lineWidth);
    expect(mockTvChart.setBodyFont).toHaveBeenCalledWith(bodyFont);
    expect(mockTvChart.setQuantityFont).toHaveBeenCalledWith(quantityFont);
    expect(mockTvChart.setLineColor).toHaveBeenCalledWith(lineColor);
    expect(mockTvChart.setBodyBorderColor).toHaveBeenCalledWith(
      bodyBorderColor
    );
    expect(mockTvChart.setBodyBackgroundColor).toHaveBeenCalledWith(
      bodyBackgroundColor
    );
    expect(mockTvChart.setBodyTextColor).toHaveBeenCalledWith(bodyTextColor);
    expect(mockTvChart.setQuantityBorderColor).toHaveBeenCalledWith(
      quantityBorderColor
    );
    expect(mockTvChart.setQuantityBackgroundColor).toHaveBeenCalledWith(
      quantityBackgroundColor
    );
    expect(mockTvChart.setQuantityTextColor).toHaveBeenCalledWith(
      quantityTextColor
    );
    expect(mockTvChart.setReverseButtonBorderColor).toHaveBeenCalledWith(
      reverseButtonBorderColor
    );
    expect(mockTvChart.setReverseButtonBackgroundColor).toHaveBeenCalledWith(
      reverseButtonBackgroundColor
    );
    expect(mockTvChart.setReverseButtonIconColor).toHaveBeenCalledWith(
      reverseButtonIconColor
    );
    expect(mockTvChart.setCloseButtonBorderColor).toHaveBeenCalledWith(
      closeButtonBorderColor
    );
    expect(mockTvChart.setCloseButtonBackgroundColor).toHaveBeenCalledWith(
      closeButtonBackgroundColor
    );
    expect(mockTvChart.setCloseButtonIconColor).toHaveBeenCalledWith(
      closeButtonIconColor
    );
    expect(db.add).toHaveBeenCalledTimes(1);
    expect(db.add).toHaveBeenCalledWith(
      positionData,
      positionStyle,
      mockTvChart,
      POSITION_LINE
    );
    expect(result.error).toBe(undefined);
  });

  it(`should emit message Reverse callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_POSITION_REVERSE) {
        const expectedMessage = {
          type: ON_POSITION_REVERSE,
          line: {
            id: 1,
            price: 10,
          },
        };
        expect(db.get).toHaveBeenCalledWith(
          expectedMessage.line.id,
          POSITION_LINE
        );
        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addPosition(tvUtil, db, onInteraction$, position);
    expect(mockTvChart.onReverse).toHaveBeenCalledTimes(1);
    const onReverseCb = mockTvChart.onReverse.mock.calls[0][0];
    global.getPrice = jest.fn().mockImplementation(() => 180);
    onReverseCb();
  });

  it(`should emit message onModify callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_POSITION_MODIFY) {
        const expectedMessage = {
          type: ON_POSITION_MODIFY,
          line: {
            id: 1,
            price: 10,
          },
        };
        expect(db.get).toHaveBeenCalledWith(
          expectedMessage.line.id,
          POSITION_LINE
        );
        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addPosition(tvUtil, db, onInteraction$, position);
    const onModify = mockTvChart.onModify.mock.calls[0][0];
    onModify();
  });

  it(`should emit message onClose callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_POSITION_CLOSE) {
        const expectedMessage = {
          type: ON_POSITION_CLOSE,
          line: {
            id: 1,
            price: 10,
          },
        };
        expect(message).toEqual(expectedMessage);
        expect(db.del).toHaveBeenCalledTimes(0);
        done();
      }
    });

    addPosition(tvUtil, db, onInteraction$, position);

    const onClose = mockTvChart.onClose.mock.calls[0][0];
    onClose();
  });
});
