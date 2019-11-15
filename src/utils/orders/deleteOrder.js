const { lineType } = require('../../const');

const { ORDER_LINE } = lineType;

module.exports = (tvUtil, db, onInteraction$, id) => {
  const { tvLine } = db.get(id, ORDER_LINE);
  tvLine.remove();
  return db.del(id, ORDER_LINE);
};
