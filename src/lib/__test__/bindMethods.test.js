const { Subject } = require('rxjs');
const bindMethods = require('../bindMethods');

describe('tvUtil function', () => {
  it(`should have all methods`, () => {
    const methods = bindMethods();

    expect(methods.order).toContainAllKeys(['add', 'delete', 'update']);
    expect(methods).toContainKey('interactions$');
    expect(methods.interactions$).toBeInstanceOf(Subject);
  });
});
