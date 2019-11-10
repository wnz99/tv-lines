const u = require('updeep');

module.exports = (tvUtil, db, onInteraction$, orderId, orderUpdate) => {
  const { data, style } = orderUpdate;
  const prevOrder = db.get(orderId);

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
