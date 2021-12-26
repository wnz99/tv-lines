/* eslint-disable @typescript-eslint/no-explicit-any */
import { partial } from 'lodash';
import { Subject } from 'rxjs';

import addOrder from '../utils/orders/addOrder';
import deleteOrder from '../utils/orders/deleteOrder';
import updateOrder from '../utils/orders/updateOrder';
import addPosition from '../utils/positions/addPosition';
import deletePosition from '../utils/positions/deletePosition';
import updatePosition from '../utils/positions/updatePosition';
import getPosition from '../utils/positions/getPosition';
import { TvChart, TvLines, OnInteraction, InteractionMsg } from '../types';
import db, { Db } from './db';

const bindMethods = (tvChart: TvChart) => {
  const onInteracton$ = new Subject<InteractionMsg>();

  const tvUtil: TvLines = {
    order: {} as TvLines['order'],
    position: {} as TvLines['position'],
    tvChart,
    isBrowser: typeof window !== 'undefined',
    interactions$: onInteracton$,
  };

  const compose = <T>(fn: (...args: any[]) => any) => {
    return partial<TvLines, Db, OnInteraction, T, any>(
      fn,
      tvUtil,
      db,
      onInteracton$
    );
  };

  // Orders
  tvUtil.order.add = compose(addOrder);
  tvUtil.order.delete = compose(deleteOrder);
  tvUtil.order.update = compose(updateOrder);

  // Positions
  tvUtil.position.add = compose(addPosition);
  tvUtil.position.delete = compose(deletePosition);
  tvUtil.position.update = compose(updatePosition);
  tvUtil.position.get = compose(getPosition);

  return tvUtil;
};

export default bindMethods;
