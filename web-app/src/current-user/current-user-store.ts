import { createAuthStateStoreApi } from '@firebase-with-passkeys/auth-create-store-api';

let store: ReturnType<typeof createAuthStateStoreApi> | null = null;

export const getCurrentUserStore = () => {
  if (store === null) {
    store = createAuthStateStoreApi();
  }
  return store;
};
