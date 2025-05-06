'use client';

import { AppProgressProvider } from '@bprogress/next';
import { ColorStyle } from '@teamgather/common';
import { ReactNode } from 'react';

/**
 * ANCHOR Props
 * @date 07/05/2025 - 00:50:24
 *
 * @typedef {Props}
 */
type Props = {
  children: ReactNode;
};

/**
 * ANCHOR Progress Bar
 * @date 07/05/2025 - 00:49:58
 *
 * @param {Props} props
 * @returns {*}
 */
const ProgressBar = (props: Props) => {
  const { children } = props;

  // ANCHOR Render
  return (
    <AppProgressProvider
      color={ColorStyle.Primary}
      height="2px"
      shallowRouting={true}
      options={{
        showSpinner: false,
      }}>
      {children}
    </AppProgressProvider>
  );
};

export default ProgressBar;
