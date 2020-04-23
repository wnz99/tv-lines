const { lineType } = require('../../const');

const { POSITION_LINE } = lineType;

module.exports = (_tvUtil, db, _onInteraction$, id) =>
  db.get(id, POSITION_LINE);
