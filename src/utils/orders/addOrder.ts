import {
  InteractionType,
  TvInteractionType,
  LineType,
  TvLines,
  OnInteraction,
  Order,
  TvCtx,
} from '../../types';
import { generalOrderProps, defaultOrderStyleProps } from '../../const';
import makeInteractionMsg from '../misc/makeInteractionMsg';
import { Db } from '../../lib/db';

const addOrder = (
  tvUtil: TvLines,
  db: Db,
  onInteraction$: OnInteraction,
  order: Order
) => {
  const { tvChart } = tvUtil;
  const { data, style } = order;
  const fullOrderData = { ...generalOrderProps, ...data };
  const fullOrderStyle = { ...defaultOrderStyleProps, ...style };
  const {
    id,
    price,
    quantity,
    tooltip,
    modifyToolTip,
    cancelToolTip,
    editable,
    cancellable,
    text,
    interactions,
  } = fullOrderData;

  const {
    extendLeft,
    lineLength,
    lineStyle,
    lineWidth,
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
  } = fullOrderStyle;

  const { ON_ORDER_ADD, ON_ORDER_CANCEL, ON_ORDER_MODIFY, ON_ORDER_MOVE } =
    InteractionType;

  const { ON_CANCEL, ON_MODIFY, ON_MOVE } = TvInteractionType;

  const interactionsMap = {
    [ON_CANCEL]: ON_ORDER_CANCEL,
    [ON_MODIFY]: ON_ORDER_MODIFY,
    [ON_MOVE]: ON_ORDER_MOVE,
  };

  const { ORDER_LINE } = LineType;

  try {
    const orderLineInstance = tvChart.createOrderLine();

    // General properties methods
    orderLineInstance
      .setPrice(Number(price))
      .setQuantity(quantity)
      .setText(text)
      .setCancelTooltip(cancelToolTip)
      .setEditable(editable)
      .setCancellable(cancellable)
      .setModifyTooltip(modifyToolTip)
      .setTooltip(tooltip);

    // Callbacks
    if (interactions?.length) {
      interactions.forEach((interactionMethod) => {
        if (Object.values(TvInteractionType).includes(interactionMethod)) {
          orderLineInstance[interactionMethod](function (this: TvCtx) {
            const order = db.get(id, ORDER_LINE);

            if (!order) {
              return;
            }

            const message = makeInteractionMsg(
              interactionsMap[interactionMethod],
              order
            );

            if (interactionMethod === ON_MOVE) {
              let priceUpdate: number | undefined;

              if (this?.getPrice) {
                priceUpdate = this.getPrice();
              }

              // For testing.
              // TO-DO: find a better solution.
              if (window?.getPrice) {
                priceUpdate = window.getPrice();
              }

              message.update = {
                price: priceUpdate,
              };
            }

            onInteraction$.next(message);
          });
        }
      });
    }

    // Style methods
    orderLineInstance
      .setExtendLeft(extendLeft)
      .setLineLength(lineLength)
      .setLineStyle(lineStyle)
      .setLineWidth(lineWidth)
      .setBodyFont(bodyFont)
      .setQuantityFont(quantityFont)
      .setLineColor(lineColor)
      .setBodyBorderColor(bodyBorderColor)
      .setBodyBackgroundColor(bodyBackgroundColor)
      .setBodyTextColor(bodyTextColor)
      .setQuantityBorderColor(quantityBorderColor)
      .setQuantityBackgroundColor(quantityBackgroundColor)
      .setQuantityTextColor(quantityTextColor)
      .setCancelButtonBorderColor(cancelButtonBorderColor)
      .setCancelButtonBackgroundColor(cancelButtonBackgroundColor)
      .setCancelButtonIconColor(cancelButtonIconColor);

    const order = db.add({ ...data }, style, orderLineInstance, ORDER_LINE);

    onInteraction$.next(makeInteractionMsg(ON_ORDER_ADD, order));

    return orderLineInstance;
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
  }
};

export default addOrder;
