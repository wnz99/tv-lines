const { lineType } = require('../../const');

const { POSITION_LINE } = lineType;

module.exports = (tvUtil, db, onInteraction$, id) => {
  const { tvLine } = db.get(id, POSITION_LINE);
  tvLine.remove();
  return db.del(id, POSITION_LINE);
};
