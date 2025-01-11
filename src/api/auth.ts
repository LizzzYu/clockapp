import axios from 'axios';

interface LoginRequest {
  username: string;
  password: string;
  expiresInMins: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface ApiErrorResponse {
  message: string;
}

const AUTH_API_PATH = 'https://dummyjson.com/auth/login'

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    AUTH_API_PATH,
    loginRequest,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
