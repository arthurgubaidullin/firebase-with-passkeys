import {
  FirebaseApp,
  FirebaseOptions,
  getApps,
  initializeApp,
} from 'firebase/app';

const DEFAULT = '[DEFAULT]' as const;

export const getOrInitializeApp = (options: FirebaseOptions, name?: string) => {
  let app: FirebaseApp;
  const _name = name ?? DEFAULT;
  const _app = getApps().find((a) => a.name === _name);
  if (_app) {
    app = _app;
  } else {
    app = initializeApp(options, _name);
  }
  return app;
};
