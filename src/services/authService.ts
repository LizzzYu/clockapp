import { login, LoginResponse } from '../api/auth';

export const performLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await login({ username, password, expiresInMins: 30 });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
};
