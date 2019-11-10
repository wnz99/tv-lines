const bindMethods = require('./lib/bindMethods');

module.exports = tvChart => {
  const tvLines = bindMethods(tvChart);

  tvLines.isBrowser = typeof window !== 'undefined';

  return tvLines;
};
