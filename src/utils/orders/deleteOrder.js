module.exports = (tvUtil, db, onInteraction$, id) => {
  const { tvLine } = db.get(id);
  tvLine.remove();
  return db.del(id);
};
