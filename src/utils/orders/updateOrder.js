const u = require('updeep');
const { lineType } = require('../../const');

module.exports = (tvUtil, db, onInteraction$, orderId, orderUpdate) => {
  const { data, style } = orderUpdate;
  const { ORDER_LINE } = lineType;

  const prevOrder = db.get(orderId, ORDER_LINE);

  data.id = orderId;
  const order = {
    data: u(data, prevOrder.data),
    style: u(style, prevOrder.style),
  };

  try {
    prevOrder.tvLine.remove();
    return tvUtil.order.add(order);
  } catch (err) {
    return { error: err.message };
  }
};
