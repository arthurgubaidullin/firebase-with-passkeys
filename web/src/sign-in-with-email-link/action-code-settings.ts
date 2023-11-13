const HOST: string = import.meta.env['VITE_HOST'] ?? '';

export const actionCodeSettings = {
  url: `${HOST}/sign-in/complete`,
  handleCodeInApp: true,
};
