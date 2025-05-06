'use client';

import { ReactNode } from 'react';
import { Poppins, Prompt } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

/**
 * ANCHOR Poppins
 * @date 06/05/2025 - 23:33:06
 *
 * @type {*}
 */
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

/**
 * ANCHOR Prompt
 * @date 06/05/2025 - 23:33:10
 *
 * @type {*}
 */
const prompt = Prompt({
  subsets: ['thai'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

// font family
const fontFamily: string = [
  poppins.style.fontFamily,
  prompt.style.fontFamily,
].join(', ');

/**
 * ANCHOR Theme
 * @date 07/05/2025 - 03:09:41
 *
 * @type {*}
 */
const theme = createTheme({
  typography: {
    fontFamily,
  },
});

/**
 * ANCHOR Props
 * @date 06/05/2025 - 23:33:30
 *
 * @typedef {Props}
 */
type Props = {
  children: ReactNode;
};

/**
 * ANCHOR Body
 * @date 06/05/2025 - 23:33:35
 *
 * @param {Props} props
 * @returns {*}
 */
const Body = (props: Props) => {
  const { children } = props;

  // ANCHOR Render
  return (
    <body
      style={{
        fontFamily,
        fontStyle: poppins.style.fontStyle,
      }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  );
};

export default Body;
