import { UnsafeConfigStruct } from '@firebase-with-passkeys/passkeys-config-struct';

export interface ReadConfig {
  readonly getConfig: () => UnsafeConfigStruct;
}

export type ConfigReader = ReadConfig;
