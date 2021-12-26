import { LineType, TvLines, OnInteraction } from '../../types';
import { Db } from '../../lib/db';

const { POSITION_LINE } = LineType;

const deletePosition = (
  _tvUtil: TvLines,
  db: Db,
  _onInteraction$: OnInteraction,
  id: string
) => {
  const position = db.get(id, POSITION_LINE);

  if (position) {
    const { tvLine } = position;

    tvLine.remove();

    return db.del(id, POSITION_LINE);
  }
};

export default deletePosition;
