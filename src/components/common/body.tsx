'use client';

import { ReactNode } from 'react';
import { Poppins, Prompt } from 'next/font/google';

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
      {children}
    </body>
  );
};

export default Body;
