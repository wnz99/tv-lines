import {
  LineType,
  TvLines,
  OnInteraction,
  Order,
  OrderUpdate,
} from '../../types';
import { Db } from '../../lib/db';

const updateOrder = (
  tvUtil: TvLines,
  db: Db,
  _onInteraction$: OnInteraction,
  order: { id: string; update: OrderUpdate }
) => {
  const {
    id,
    update: { data, style },
  } = order;

  const { ORDER_LINE } = LineType;

  const prevOrder = db.get(id, ORDER_LINE);

  if (!prevOrder) {
    return;
  }

  data.id = id;

  const updatedOrder = {
    data: { ...prevOrder.data, ...data } as Order['data'],
    style: { ...prevOrder.style, ...style } as Order['style'],
  };

  try {
    prevOrder.tvLine.remove();

    return tvUtil.order.add(updatedOrder);
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
  }

  return undefined;
};

export default updateOrder;
