const TOKEN_KEY = 'your_token_key';
const TOKEN_EXPIRY_KEY = 'your_token_expiry_key';
const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 10000; // Пример: 24 часа

export const saveToken = (token: string, rememberMe: boolean) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (rememberMe) {
    const expiryDate = new Date().getTime() + TOKEN_EXPIRY_TIME;
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toString());
  }
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryDate = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (token && expiryDate) {
    const now = new Date().getTime();
    if (now > parseInt(expiryDate, 10)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      return null;
    }
  }
  return token;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};
