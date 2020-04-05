const u = require('updeep');
const {
  defaultPositionProps,
  interactionType,
  defaultPositionStyleProps,
  lineType,
  tvInteractionType,
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
    interactions,
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

  const { ON_CLOSE, ON_MODIFY, ON_REVERSE } = tvInteractionType;

  const interactionsMap = {
    [ON_CLOSE]: ON_POSITION_CLOSE,
    [ON_MODIFY]: ON_POSITION_MODIFY,
    [ON_REVERSE]: ON_POSITION_REVERSE,
  };

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
      .setTooltip(tooltip);

    // Callbacks
    interactions.forEach(interactionMethod => {
      if (Object.values(tvInteractionType).includes(interactionMethod)) {
        positionLine[interactionMethod](() => {
          const message = makeInteractionMsg(
            interactionsMap[interactionMethod],
            db.get(id, POSITION_LINE)
          );

          onInteraction$.next(message);
        });
      }
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
