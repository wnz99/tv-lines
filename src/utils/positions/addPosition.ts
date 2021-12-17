import {
  InteractionType,
  TvInteractionType,
  LineType,
  TvUtil,
  OnInteraction,
  Position,
} from '../../types';
import { generalPositionProps, defaultPositionStyleProps } from '../../const';
import makeInteractionMsg from '../misc/makeInteractionMsg';
import { Db } from '../../lib/db';

const addPosition = (
  tvUtil: TvUtil,
  db: Db,
  onInteraction$: OnInteraction,
  position: Position
) => {
  const { tvChart } = tvUtil;
  const { data, style } = position;
  const fullPositionData = { ...generalPositionProps, ...data };
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
  } = InteractionType;

  const { ON_CLOSE, ON_MODIFY, ON_REVERSE } = TvInteractionType;

  const interactionsMap = {
    [ON_CLOSE]: ON_POSITION_CLOSE,
    [ON_MODIFY]: ON_POSITION_MODIFY,
    [ON_REVERSE]: ON_POSITION_REVERSE,
  };

  const { POSITION_LINE } = LineType;

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
    if (interactions?.length) {
      interactions.forEach((interactionMethod) => {
        if (Object.values(TvInteractionType).includes(interactionMethod)) {
          positionLine[interactionMethod](() => {
            const position = db.get(id, POSITION_LINE);

            if (!position) {
              return;
            }

            const message = makeInteractionMsg(
              interactionsMap[interactionMethod],
              position
            );

            onInteraction$.next(message);
          });
        }
      });
    }

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

    const position = db.add({ ...data }, style, positionLine, POSITION_LINE);

    onInteraction$.next(makeInteractionMsg(ON_POSITION_ADD, position));
    return positionLine;
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
  }
};

export default addPosition;
