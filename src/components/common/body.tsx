'use client';

import Root from './root';
import { ReactNode } from 'react';
import { Poppins, Prompt } from 'next/font/google';

/**
 * ANCHOR Poppins
 * @date 13/04/2025 - 17:42:19
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
 * @date 24/04/2025 - 22:30:35
 *
 * @type {*}
 */
const prompt = Prompt({
  subsets: ['thai'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

/**
 * ANCHOR Props
 * @date 24/04/2025 - 22:31:16
 *
 * @typedef {Props}
 */
type Props = {
  children: ReactNode;
};

/**
 * ANCHOR Body
 * @date 13/04/2025 - 18:04:59
 *
 * @param {Props} props
 * @returns {*}
 */
const Body = (props: Props) => {
  const { children } = props;

  // font family
  const fontFamily: string = [
    poppins.style.fontFamily,
    prompt.style.fontFamily,
  ].join(', ');

  // ANCHOR Render
  return (
    <body
      style={{
        fontFamily,
        fontStyle: poppins.style.fontStyle,
      }}>
      <Root>{children}</Root>
    </body>
  );
};

export default Body;
