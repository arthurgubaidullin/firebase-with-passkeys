import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { enforceHandler } from './enforce-handler';

const fakeHandler = async (data: {
  test: boolean;
}): Promise<{ test: boolean }> => data;

const fakeContract = {
  request: t.type({ test: t.boolean }),
  response: t.type({ test: t.boolean }),
};

describe('httpsCallableEnforcer', () => {
  describe('enforceHandler()', () => {
    it('should work', async () => {
      const callable = pipe(fakeHandler, enforceHandler(fakeContract));

      expect(await callable({ test: true })).toEqual({ test: true });
      expect(await callable({ test: false })).toEqual({ test: false });
    });
    it('should not work', async () => {
      const callable = pipe(fakeHandler, enforceHandler(fakeContract));

      await expect(callable({ test: 'test' })).rejects.toThrow();
      await expect(callable({ test: 123 })).rejects.toThrow();
    });
  });
});
