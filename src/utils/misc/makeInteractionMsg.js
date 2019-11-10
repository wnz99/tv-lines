module.exports = (type, order) => {
  const timestamp = new Date(Date.now()).getTime();
  return { type, timestamp, order };
};
