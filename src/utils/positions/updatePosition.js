const u = require('updeep');
const { lineType } = require('../../const');

module.exports = (tvUtil, db, onInteraction$, positionId, positionUpdate) => {
  const { data, style } = positionUpdate;
  const { POSITION_LINE } = lineType;

  const prevPosition = db.get(positionId, POSITION_LINE);

  data.id = positionId;
  const position = {
    data: u(data, prevPosition.data),
    style: u(style, prevPosition.style),
  };

  try {
    prevPosition.tvLine.remove();
    return tvUtil.position.add(position);
  } catch (err) {
    return { error: err.message };
  }
};
