import { LineType, TvLines, OnInteraction } from '../../types';
import { Db } from '../../lib/db';

const { ORDER_LINE } = LineType;

const deleteOrder = (
  _tvUtil: TvLines,
  db: Db,
  _onInteraction$: OnInteraction,
  id: string
) => {
  const order = db.get(id, ORDER_LINE);

  if (order) {
    const { tvLine } = order;

    tvLine.remove();

    return db.del(id, ORDER_LINE);
  }
};

export default deleteOrder;
