const u = require('updeep');
const {
  defaultPositionProps,
  interactionType,
  defaultPositionStyleProps,
  lineType,
} = require('../../const');
const makeInteractionMsg = require('../misc/makeInteractionMsg');

module.exports = (tvUtil, db, onInteraction$, position) => {
  const { tvChart } = tvUtil;
  const { data, style } = position;
  const fullPositionData = { ...defaultPositionProps, ...data };
  const fullPositionStyle = { ...defaultPositionStyleProps, ...style };
  const {
    id,
    price,
    quantity,
    tooltip,
    protectTooltip,
    reverseTooltip,
    closeTooltip,
    text,
  } = fullPositionData;

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
    reverseButtonBorderColor,
    reverseButtonBackgroundColor,
    reverseButtonIconColor,
    closeButtonBorderColor,
    closeButtonBackgroundColor,
    closeButtonIconColor,
  } = fullPositionStyle;

  const {
    ON_POSITION_ADD,
    ON_POSITION_CLOSE,
    ON_POSITION_MODIFY,
    ON_POSITION_REVERSE,
  } = interactionType;

  const { POSITION_LINE } = lineType;

  try {
    const positionLine = tvChart.createPositionLine();

    // General properties methods
    positionLine
      .setPrice(Number(price))
      .setQuantity(quantity)
      .setText(text)
      .setProtectTooltip(protectTooltip)
      .setCloseTooltip(closeTooltip)
      .setReverseTooltip(reverseTooltip)
      .setTooltip(tooltip)
      .onReverse(function onMove() {
        onInteraction$.next(
          makeInteractionMsg(ON_POSITION_REVERSE, db.get(id, POSITION_LINE))
        );
      })
      .onModify(function onModify() {
        onInteraction$.next(
          makeInteractionMsg(ON_POSITION_MODIFY, db.get(id, POSITION_LINE))
        );
      })
      .onClose(function onCancel() {
        onInteraction$.next(
          makeInteractionMsg(ON_POSITION_CLOSE, db.get(id, POSITION_LINE))
        );
      });

    // Style methods
    positionLine
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
      .setReverseButtonBorderColor(reverseButtonBorderColor)
      .setReverseButtonBackgroundColor(reverseButtonBackgroundColor)
      .setReverseButtonIconColor(reverseButtonIconColor)
      .setCloseButtonBorderColor(closeButtonBorderColor)
      .setCloseButtonBackgroundColor(closeButtonBackgroundColor)
      .setCloseButtonIconColor(closeButtonIconColor);

    db.add(u(data, {}), style, positionLine, POSITION_LINE);

    onInteraction$.next(
      makeInteractionMsg(ON_POSITION_ADD, db.get(id, POSITION_LINE))
    );
    return positionLine;
  } catch (err) {
    return { error: err.message };
  }
};
