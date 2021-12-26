import {
  LineType,
  TvLines,
  OnInteraction,
  Position,
  PositionUpdate,
} from '../../types';
import { Db } from '../../lib/db';

const updatePosition = (
  tvUtil: TvLines,
  db: Db,
  _onInteraction$: OnInteraction,
  position: { id: string; update: PositionUpdate }
) => {
  const {
    id,
    update: { data, style },
  } = position;

  const { POSITION_LINE } = LineType;

  const prevPosition = db.get(id, POSITION_LINE);

  if (!prevPosition) {
    return;
  }

  data.id = id;

  const updatgedPosition = {
    data: { ...prevPosition.data, ...data } as Position['data'],
    style: { ...prevPosition.style, ...style } as Position['style'],
  };

  try {
    prevPosition.tvLine.remove();

    return tvUtil.position.add(updatgedPosition);
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
  }
};

export default updatePosition;
