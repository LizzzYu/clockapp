import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  redirectMessage: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  redirectMessage: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
    },
    setRedirectMessage: (state, action: PayloadAction<string | null>) => {
      state.redirectMessage = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setRedirectMessage } = authSlice.actions;
export default authSlice.reducer;
