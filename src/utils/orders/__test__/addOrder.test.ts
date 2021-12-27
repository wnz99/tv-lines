/* global tvChart */
import { Subject } from 'rxjs';

import addOrder from '../addOrder';
import db, { Db, DbLine } from '../../../lib/db';
import makeInteractionMsg from '../../misc/makeInteractionMsg';
import { defaultOrderStyleProps } from '../../../const';
import {
  InteractionType,
  LineType,
  IOrderLineAdapter,
  TvLines,
  Order,
  GeneralOrderProps,
  InteractionMsg,
} from '../../../types';

jest.mock('../../../lib/db');

jest.mock('../../misc/makeInteractionMsg');

const mockMakeInteractionMsg = makeInteractionMsg as jest.MockedFunction<
  typeof makeInteractionMsg
>;

mockMakeInteractionMsg.mockImplementation((type, order) => {
  return {
    type,
    line: { ...order },
    timestamp: 123,
  };
});

const mockDb = db as jest.Mocked<Db>;

mockDb.add.mockImplementation(() => {
  return {
    data: { id: '1', price: 10 },
    style: {},
    tvLine: {},
  } as unknown as DbLine;
});

mockDb.get.mockImplementation(() => {
  return {
    data: { id: '1', price: 10 },
    style: {},
    tvLine: {},
  } as unknown as DbLine;
});

const { ORDER_LINE } = LineType;

const { ON_ORDER_ADD, ON_ORDER_CANCEL, ON_ORDER_MODIFY, ON_ORDER_MOVE } =
  InteractionType;

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
  cancelButtonIconColor,
} = defaultOrderStyleProps;

const orderStyle = {
  extendLeft: false,
  lineLength: 4,
  lineStyle: 5,
  lineWidth: 6,
};

const orderData = {
  id: '1',
  price: 10,
  quantity: '100',
  tooltip: 'order tooltip',
  modifyToolTip: 'modify tooltip test',
  cancelToolTip: 'cancel tooltip test',
  editable: true,
  text: 'BUY: Price 10',
  interactions: ['onCancel', 'onModify', 'onMove'],
};

const order = { data: orderData, style: orderStyle } as Order &
  GeneralOrderProps;

let mockTvChart: any;

let tvUtil: TvLines;

declare global {
  function tvChart(): IOrderLineAdapter;
  function getPrice(): jest.Mocked<number>;
}

describe('addOrder function', () => {
  beforeEach(() => {
    mockTvChart = tvChart() as unknown as IOrderLineAdapter;

    tvUtil = {
      tvChart: mockTvChart,
    } as TvLines;
    mockDb.get.mockClear();
    mockDb.del.mockClear();
  });

  it(`should return error`, () => {
    const onInteraction$ = new Subject<InteractionMsg>();
    mockTvChart.createOrderLine.mockImplementation(() => {
      throw Error('Test error');
    });

    const result = addOrder(tvUtil, mockDb, onInteraction$, order);

    expect(result).toEqual({ error: 'Test error' });
  });

  it(`should add an order`, (done) => {
    const onInteraction$ = new Subject<InteractionMsg>();

    onInteraction$.subscribe((message) => {
      const expectedMessage = {
        type: ON_ORDER_ADD,
        line: {
          data: { id: '1', price: 10 },
          style: {},
          tvLine: {},
        },
        timestamp: 123,
      };
      expect(message).toEqual(expectedMessage);
      done();
    });

    const {
      data: {
        price,
        quantity,
        tooltip,
        modifyToolTip,
        cancelToolTip,
        editable,
        text,
      },
      style: { extendLeft, lineLength, lineStyle, lineWidth },
    } = order;

    const result = addOrder(tvUtil, mockDb, onInteraction$, order);

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
    expect(mockTvChart.setCancelTooltip).toHaveBeenCalledWith(cancelToolTip);
    expect(mockTvChart.setEditable).toHaveBeenCalledWith(editable);
    expect(mockTvChart.setModifyTooltip).toHaveBeenCalledWith(modifyToolTip);
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
      cancelButtonIconColor
    );

    expect(mockDb.add).toHaveBeenCalledTimes(1);
    expect(mockDb.add).toHaveBeenCalledWith(
      orderData,
      orderStyle,
      mockTvChart,
      ORDER_LINE
    );

    expect(result).not.toBe(undefined);
  });

  it(`should emit message onMove callback`, (done) => {
    const onInteraction$ = new Subject<InteractionMsg>();
    global.getPrice = jest.fn().mockImplementation(() => 180);

    onInteraction$.subscribe((message) => {
      if (message.type === ON_ORDER_MOVE) {
        const expectedMessage = {
          type: ON_ORDER_MOVE,
          line: {
            data: { id: '1', price: 10 },
            style: {},
            tvLine: {},
          },
          update: {
            price: 180,
          },
          timestamp: 123,
        };
        expect(mockDb.get).toHaveBeenCalledWith(
          expectedMessage.line.data.id,
          ORDER_LINE
        );

        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addOrder(tvUtil, mockDb, onInteraction$, order);

    expect(mockTvChart.onMove).toHaveBeenCalledTimes(1);

    const onMove = mockTvChart.onMove.mock.calls[0][0];

    onMove();
  });

  it(`should emit message onModify callback`, (done) => {
    const onInteraction$ = new Subject<InteractionMsg>();
    onInteraction$.subscribe((message) => {
      if (message.type === ON_ORDER_MODIFY) {
        const expectedMessage = {
          type: ON_ORDER_MODIFY,
          line: {
            data: { id: '1', price: 10 },
            style: {},
            tvLine: {},
          },
          timestamp: 123,
        };
        expect(mockDb.get).toHaveBeenCalledWith(
          expectedMessage.line.data.id,
          ORDER_LINE
        );
        expect(message).toEqual(expectedMessage);
        done();
      }
    });

    addOrder(tvUtil, mockDb, onInteraction$, order);
    const onModify = mockTvChart.onModify.mock.calls[0][0];
    onModify();
  });

  it(`should emit message onCancel callback`, (done) => {
    const onInteraction$ = new Subject<InteractionMsg>();
    onInteraction$.subscribe((message) => {
      if (message.type === ON_ORDER_CANCEL) {
        const expectedMessage = {
          type: ON_ORDER_CANCEL,
          line: {
            data: { id: '1', price: 10 },
            style: {},
            tvLine: {},
          },
          timestamp: 123,
        };
        expect(message).toEqual(expectedMessage);
        expect(mockDb.del).toHaveBeenCalledTimes(0);
        done();
      }
    });

    addOrder(tvUtil, mockDb, onInteraction$, order);

    const onCancel = mockTvChart.onCancel.mock.calls[0][0];
    onCancel();
  });
});
