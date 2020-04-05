const u = require('updeep');
const {
  defaultOrderProps,
  interactionType,
  defaultOrderStyleProps,
  lineType,
  tvInteractionType,
} = require('../../const');
const makeInteractionMsg = require('../misc/makeInteractionMsg');

module.exports = (tvUtil, db, onInteraction$, order) => {
  const { tvChart } = tvUtil;
  const { data, style } = order;
  const fullOrderData = { ...defaultOrderProps, ...data };
  const fullOrderStyle = { ...defaultOrderStyleProps, ...style };
  const {
    id,
    price,
    quantity,
    tooltip,
    modifyTooltip,
    cancelTooltip,
    editable,
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

  const {
    ON_ORDER_ADD,
    ON_ORDER_CANCEL,
    ON_ORDER_MODIFY,
    ON_ORDER_MOVE,
  } = interactionType;

  const { ON_CANCEL, ON_MODIFY, ON_MOVE } = tvInteractionType;

  const interactionsMap = {
    [ON_CANCEL]: ON_ORDER_CANCEL,
    [ON_MODIFY]: ON_ORDER_MODIFY,
    [ON_MOVE]: ON_ORDER_MOVE,
  };

  const { ORDER_LINE } = lineType;

  try {
    const orderLine = tvChart.createOrderLine();

    // General properties methods
    orderLine
      .setPrice(Number(price))
      .setQuantity(quantity)
      .setText(text)
      .setCancelTooltip(cancelTooltip)
      .setEditable(editable)
      .setModifyTooltip(modifyTooltip)
      .setTooltip(tooltip);

    // Callbacks
    interactions.forEach(interactionMethod => {
      if (Object.values(tvInteractionType).includes(interactionMethod)) {
        orderLine[interactionMethod](function() {
          const message = makeInteractionMsg(
            interactionsMap[interactionMethod],
            db.get(id, ORDER_LINE)
          );

          if (interactionMethod === ON_MOVE) {
            message.update = {
              price: this.getPrice(),
            };
          }

          onInteraction$.next(message);
        });
      }
    });

    // Style methods
    orderLine
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

    db.add(u(data, {}), style, orderLine, ORDER_LINE);

    onInteraction$.next(
      makeInteractionMsg(ON_ORDER_ADD, db.get(id, ORDER_LINE))
    );
    return orderLine;
  } catch (err) {
    return { error: err.message };
  }
};
