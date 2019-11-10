const bindMethods = require('./lib/bindMethods');

module.exports = tvChart => {
  const tvUtil = bindMethods(tvChart);

  tvUtil.isBrowser = typeof window !== 'undefined';

  return tvUtil;
};
