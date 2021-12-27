import bindMethods from './lib/bindMethods';
import { TvChart } from './types';
export * from './types';

const tvLines = (tvChart: TvChart) => {
  const lines = bindMethods(tvChart);

  return lines;
};

tvLines.tvVersion =
  'CL v20.032 (internal id ad2f4a55 @ 2021-10-28T12:29:15.152Z)';

export default tvLines;
