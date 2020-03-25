const u = require('updeep');
const {
  defaultOrderProps,
  interactionType,
  defaultOrderStyleProps,
  lineType,
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
    cancelButtonIconColorString,
  } = fullOrderStyle;

  const {
    ON_ORDER_ADD,
    ON_ORDER_CANCEL,
    ON_ORDER_MODIFY,
    ON_ORDER_MOVE,
  } = interactionType;

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
      .setTooltip(tooltip)
      .onMove(function onMove() {
        const message = {
          ...makeInteractionMsg(ON_ORDER_MOVE, db.get(id, ORDER_LINE)),
          update: {
            price: this.getPrice(),
          },
        };
        onInteraction$.next(message);
      })
      .onModify(function onModify() {
        onInteraction$.next(
          makeInteractionMsg(ON_ORDER_MODIFY, db.get(id, ORDER_LINE))
        );
      })
      .onCancel(function onCancel() {
        onInteraction$.next(
          makeInteractionMsg(ON_ORDER_CANCEL, db.get(id, ORDER_LINE))
        );
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
      .setCancelButtonIconColor(cancelButtonIconColorString);

    db.add(u(data, {}), style, orderLine, ORDER_LINE);

    onInteraction$.next(
      makeInteractionMsg(ON_ORDER_ADD, db.get(id, ORDER_LINE))
    );
    return orderLine;
  } catch (err) {
    return { error: err.message };
  }
};
