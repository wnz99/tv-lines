import { TvLines, OnInteraction, LineType } from '../../types';
import { Db } from '../../lib/db';

const { POSITION_LINE } = LineType;

const getPosition = (
  _tvUtil: TvLines,
  db: Db,
  _onInteraction$: OnInteraction,
  id: string
) => db.get(id, POSITION_LINE);

export default getPosition;
