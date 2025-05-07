import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '@teamgather/common';

/**
 * ANCHOR AuthState
 * @date 08/05/2025 - 04:26:48
 *
 * @export
 * @interface AuthState
 * @typedef {AuthState}
 */
export interface AuthState {
  isAuthorized: boolean;
  me: UserModel | null;
}

/**
 * ANCHOR Initial State
 * @date 08/05/2025 - 04:27:30
 *
 * @type {AuthState}
 */
const initialState: AuthState = {
  isAuthorized: false,
  me: null,
};

/**
 * ANCHOR Auth Slice
 * @date 08/05/2025 - 04:27:57
 *
 * @type {*}
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAuth } = authSlice.actions;
