import Link from 'next/link';
import { BRAND_CONSTANT } from '@teamgather/common';
import { Righteous } from 'next/font/google';

/**
 * ANCHOR Righteous
 * @date 07/05/2025 - 04:09:06
 *
 * @type {*}
 */
const righteous = Righteous({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  preload: true,
});

/**
 * ANCHOR Brand
 * @date 07/05/2025 - 04:06:33
 *
 * @returns {*}
 */
const Brand = () => {
  // ANCHOR Render
  return (
    <div className="py-2">
      <Link href="/">
        <span
          style={{
            fontFamily: righteous.style.fontFamily,
            fontStyle: righteous.style.fontStyle,
            fontSize: 32,
          }}>
          {BRAND_CONSTANT}
        </span>
      </Link>
    </div>
  );
};

export default Brand;
