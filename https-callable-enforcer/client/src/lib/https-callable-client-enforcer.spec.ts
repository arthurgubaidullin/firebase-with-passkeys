import { boolean, string, type } from 'io-ts';
import { enforceCaller } from './https-callable-client-enforcer';
import { pipe } from 'fp-ts/function';

const fakeHttpsCallable = async (
  data: unknown
): Promise<{
  data: unknown;
}> => ({ data });

const fakeContract = {
  request: type({ test: boolean }),
  response: type({ test: boolean }),
};

const fakeContract2 = {
  request: type({ test: boolean }),
  response: type({ test: string }),
};

describe('httpsCallableEnforcer', () => {
  describe('enforceCaller()', () => {
    it('should work', async () => {
      const callable = pipe(fakeHttpsCallable, enforceCaller(fakeContract));

      expect(await callable({ test: true })).toEqual({ test: true });
      expect(await callable({ test: false })).toEqual({ test: false });
    });
    it('should not work', async () => {
      const callable = pipe(fakeHttpsCallable, enforceCaller(fakeContract2));

      await expect(callable({ test: true })).rejects.toThrow();
      await expect(callable({ test: false })).rejects.toThrow();
    });
  });
});
