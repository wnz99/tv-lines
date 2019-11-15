const partial = require('lodash/partial');
const { Subject } = require('rxjs');
const addOrder = require('../utils/orders/addOrder');
const deleteOrder = require('../utils/orders/deleteOrder');
const updateOrder = require('../utils/orders/updateOrder');
const addPosition = require('../utils/positions/addPosition');
const deletePosition = require('../utils/positions/deletePosition');
const updatePosition = require('../utils/positions/updatePosition');
const db = require('./db');

module.exports = tvChart => {
  const tvUtil = { order: {}, position: {}, tvChart };

  const onInteracton$ = new Subject();

  const compose = funk => {
    return partial(funk, tvUtil, db, onInteracton$);
  };

  tvUtil.interactions$ = onInteracton$;

  // Orders
  tvUtil.order.add = compose(addOrder);
  tvUtil.order.delete = compose(deleteOrder);
  tvUtil.order.update = compose(updateOrder);

  // Positions
  tvUtil.position.add = compose(addPosition);
  tvUtil.position.delete = compose(deletePosition);
  tvUtil.position.update = compose(updatePosition);

  return tvUtil;
};
