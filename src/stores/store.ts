import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { UserModel } from '@teamgather/common';

/**
 * ANCHOR Make Store Props
 * @date 08/05/2025 - 04:29:28
 *
 * @typedef {MakeStoreProps}
 */
type MakeStoreProps = {
  isAuthorized: boolean;
  me: UserModel | null;
};

/**
 * ANCHOR Make Store
 * @date 08/05/2025 - 04:29:34
 *
 * @param {MakeStoreProps} props
 * @returns {*}
 */
export const makeStore = (props: MakeStoreProps) => {
  const { isAuthorized, me } = props;

  return configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    preloadedState: {
      [authSlice.name]: {
        isAuthorized,
        me,
      },
    },
  });
};

/**
 * ANCHOR App Store
 * @date 08/05/2025 - 04:32:33
 *
 * @export
 * @typedef {AppStore}
 */
export type AppStore = ReturnType<typeof makeStore>;

/**
 * ANCHOR Root State
 * @date 08/05/2025 - 04:32:41
 *
 * @export
 * @typedef {RootState}
 */
export type RootState = ReturnType<AppStore['getState']>;

/**
 * ANCHOR App Dispatch
 * @date 08/05/2025 - 04:32:48
 *
 * @export
 * @typedef {AppDispatch}
 */
export type AppDispatch = AppStore['dispatch'];
