import { UnsafeConfigStruct } from '@firebase-with-passkeys/passkeys-config-struct';

export interface GetConfig {
  readonly getConfig: () => UnsafeConfigStruct;
}

export type ConfigReader = GetConfig;
