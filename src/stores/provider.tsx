'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { UserModel } from '@teamgather/common';

/**
 * ANCHOR Props
 * @date 08/05/2025 - 04:28:55
 *
 * @typedef {Props}
 */
type Props = {
  isAuthorized: boolean;
  me: UserModel | null;
  children: ReactNode;
};

/**
 * ANCHOR Store Provider
 * @date 08/05/2025 - 04:28:49
 *
 * @param {Props} props
 * @returns {*}
 */
const StoreProvider = (props: Props) => {
  const { isAuthorized, me, children } = props;

  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore({
      isAuthorized,
      me,
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
