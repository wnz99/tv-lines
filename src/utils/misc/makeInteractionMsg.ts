import { InteractionType, Line, InteractionMsg } from '../../types';

const makeInteractionMsg = (
  type: InteractionType,
  data: Line
): InteractionMsg => {
  const timestamp = new Date(Date.now()).getTime();

  return { type, timestamp, line: { ...data } };
};

export default makeInteractionMsg;
