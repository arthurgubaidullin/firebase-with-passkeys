import { ConfigReader } from '@firebase-with-passkeys/passkeys-config-reader-type';

export const getConfigReader = (): ConfigReader => {
  return {
    getConfig: () => ({
      NX_RP_NAME: process.env['NX_RP_NAME'],
      NX_RP_ID: process.env['NX_RP_ID'],
      NX_ORIGIN: process.env['NX_ORIGIN'],
    }),
  };
};
