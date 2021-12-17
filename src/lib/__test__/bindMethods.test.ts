import 'jest-extended';
import { Subject } from 'rxjs';

import { TvChart } from '../../types';
import bindMethods from '../bindMethods';

const tvWidget = () => undefined;

describe('tvUtil function', () => {
  it(`should have all methods`, () => {
    const methods = bindMethods(tvWidget as unknown as TvChart);

    expect(methods.order).toContainAllKeys(['add', 'delete', 'update']);
    expect(methods.position).toContainAllKeys([
      'add',
      'delete',
      'update',
      'get',
    ]);
    expect(methods).toContainKey('interactions$');
    expect(methods.interactions$).toBeInstanceOf(Subject);
  });
});
