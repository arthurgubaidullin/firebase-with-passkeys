import { createAuthStateStoreApi } from '@firebase-with-passkeys/auth-create-store-api';

export const getCurrentUserStore = () => createAuthStateStoreApi();
