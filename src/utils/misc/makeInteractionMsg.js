module.exports = (type, data) => {
  const timestamp = new Date(Date.now()).getTime();
  return { type, timestamp, line: { ...data } };
};
