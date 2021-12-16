import { Line } from './../../../types';
import makeInteractionMsg from '../makeInteractionMsg';
import { InteractionType } from '../../../types';

const timestamp = new Date('2019-05-14T11:01:58.135Z').getTime();

describe('makeIntercationMsg function', () => {
  it(`should make a message`, () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => timestamp);
    const order = { id: 1 };
    const msg = makeInteractionMsg(
      InteractionType.ON_ORDER_ADD,
      order as unknown as Line
    );

    expect(msg).toEqual({
      type: InteractionType.ON_ORDER_ADD,
      line: { ...order },
      timestamp,
    });
    jest.spyOn(global.Date, 'now').mockRestore();
  });
});
