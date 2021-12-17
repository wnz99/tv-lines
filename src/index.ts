import bindMethods from './lib/bindMethods';
import { TvChart } from './types';
export * from './types';

const tvLines = (tvChart: TvChart) => {
  const lines = bindMethods(tvChart);

  return lines;
};

export default tvLines;
