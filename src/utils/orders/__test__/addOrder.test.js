/* global tvChart */
const { Subject } = require('rxjs');
const addOrder = require('../addOrder');
const db = require('../../../lib/db');
const makeInteractionMsg = require('../../misc/makeInteractionMsg');
const {
  interactionType,
  defaultOrderStyleProp,
  lineType,
} = require('../../../const');

jest.mock('../../../lib/db');
jest.mock('../../misc/makeInteractionMsg');
makeInteractionMsg.mockImplementation((type, order) => ({
  type,
  line: { ...order },
}));

db.get.mockImplementation(() => ({
  id: 1,
  price: 10,
}));

const { ORDER_LINE } = lineType;

const {
  ON_ORDER_ADD,
  ON_ORDER_CANCEL,
  ON_ORDER_MODIFY,
  ON_ORDER_MOVE,
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
  cancelButtonBorderColor,
  cancelButtonBackgroundColor,
  cancelButtonIconColorString,
} = defaultOrderStyleProp;

const orderStyle = {
  extendLeft: false,
  lineLength: 4,
  lineStyle: 5,
  lineWidth: 6,
};

const orderData = {
  id: 1,
  price: 10,
  quantity: 100,
  tooltip: 'order tooltip',
  modifyTooltip: 'modify tooltip test',
  cancelTooltip: 'cancel tooltip test',
  editable: true,
  text: 'BUY: Price 10',
};

const order = { data: orderData, style: orderStyle };

let mockTvChart;

let tvUtil;

describe('addOrder function', () => {
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
    mockTvChart.createOrderLine.mockImplementation(() => {
      throw Error('Test error');
    });

    const result = addOrder(tvUtil, db, onInteraction$, order);
    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should add an order`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      const expectedMessage = {
        type: ON_ORDER_ADD,
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
        modifyTooltip,
        cancelTooltip,
        editable,
        text,
      },
      style: { extendLeft, lineLength, lineStyle, lineWidth },
    } = order;

    const result = addOrder(tvUtil, db, onInteraction$, order);

    expect(result).toBe(mockTvChart);

    expect(mockTvChart.createOrderLine).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setPrice).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setQuantity).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setText).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCancelTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setEditable).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setModifyTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setTooltip).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onMove).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onModify).toHaveBeenCalledTimes(1);
    expect(mockTvChart.onCancel).toHaveBeenCalledTimes(1);

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
    expect(mockTvChart.setCancelButtonBorderColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCancelButtonBackgroundColor).toHaveBeenCalledTimes(1);
    expect(mockTvChart.setCancelButtonIconColor).toHaveBeenCalledTimes(1);

    expect(mockTvChart.setPrice).toHaveBeenCalledWith(price);
    expect(mockTvChart.setQuantity).toHaveBeenCalledWith(quantity);
    expect(mockTvChart.setText).toHaveBeenCalledWith(text);
    expect(mockTvChart.setCancelTooltip).toHaveBeenCalledWith(cancelTooltip);
    expect(mockTvChart.setEditable).toHaveBeenCalledWith(editable);
    expect(mockTvChart.setModifyTooltip).toHaveBeenCalledWith(modifyTooltip);
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
    expect(mockTvChart.setCancelButtonBorderColor).toHaveBeenCalledWith(
      cancelButtonBorderColor
    );
    expect(mockTvChart.setCancelButtonBackgroundColor).toHaveBeenCalledWith(
      cancelButtonBackgroundColor
    );
    expect(mockTvChart.setCancelButtonIconColor).toHaveBeenCalledWith(
      cancelButtonIconColorString
    );

    expect(db.add).toHaveBeenCalledTimes(1);
    expect(db.add).toHaveBeenCalledWith(
      orderData,
      orderStyle,
      mockTvChart,
      ORDER_LINE
    );

    expect(result.error).toBe(undefined);
  });

  it(`should emit message onMove callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_ORDER_MOVE) {
        const expectedMessage = {
          type: ON_ORDER_MOVE,
          line: {
            id: 1,
            price: 10,
          },
          update: {
            price: 180,
          },
        };
        expect(db.get).toHaveBeenCalledWith(
          expectedMessage.line.id,
          ORDER_LINE
        );
        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addOrder(tvUtil, db, onInteraction$, order);
    expect(mockTvChart.onMove).toHaveBeenCalledTimes(1);
    const onMove = mockTvChart.onMove.mock.calls[0][0];
    global.getPrice = jest.fn().mockImplementation(() => 180);
    onMove();
  });

  it(`should emit message onModify callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_ORDER_MODIFY) {
        const expectedMessage = {
          type: ON_ORDER_MODIFY,
          line: {
            id: 1,
            price: 10,
          },
        };
        expect(db.get).toHaveBeenCalledWith(
          expectedMessage.line.id,
          ORDER_LINE
        );
        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addOrder(tvUtil, db, onInteraction$, order);
    const onModify = mockTvChart.onModify.mock.calls[0][0];
    onModify();
  });

  it(`should emit message onCancel callback`, done => {
    const onInteraction$ = new Subject();
    onInteraction$.subscribe(message => {
      if (message.type === ON_ORDER_CANCEL) {
        const expectedMessage = {
          type: ON_ORDER_CANCEL,
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

    addOrder(tvUtil, db, onInteraction$, order);

    const onCancel = mockTvChart.onCancel.mock.calls[0][0];
    onCancel();
  });
});
