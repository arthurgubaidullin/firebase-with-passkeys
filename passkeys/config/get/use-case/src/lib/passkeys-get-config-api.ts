import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { ConfigStruct } from '@firebase-with-passkeys/passkeys-config-struct';
import * as IOE from 'fp-ts/IOEither';
import { pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';

export const getConfig = (P: GetConfig): IOE.IOEither<Error, ConfigStruct> =>
  pipe(
    IOE.fromIO(P.getConfig),
    IOE.chainEitherK(ConfigStruct.decode),
    IOE.mapLeft(failure),
    IOE.mapLeft(() => new Error('Could not read configuration for Passkeys.'))
  );
