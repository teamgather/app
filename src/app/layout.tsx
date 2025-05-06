import Body from '@/components/common/body';
import ProgressBar from '@/components/common/progress-bar';
import { LayoutProps } from '@/types/document.type';
import { BRAND_CONSTANT, SLOGAN_CONSTANT } from '@teamgather/common';
import { Metadata, Viewport } from 'next';

/**
 * ANCHOR Viewport
 * @date 07/05/2025 - 00:41:48
 *
 * @type {Viewport}
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * ANCHOR Metadata
 * @date 07/05/2025 - 00:41:43
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: `${BRAND_CONSTANT} - ${SLOGAN_CONSTANT}`,
  description: SLOGAN_CONSTANT,
};

/**
 * ANCHOR Layout
 * @date 07/05/2025 - 00:41:56
 *
 * @async
 * @param {LayoutProps} props
 * @returns {unknown}
 */
const Layout = async (props: LayoutProps) => {
  const { children } = props;

  // ANCHOR Render
  return (
    <html lang="en">
      <head></head>
      <Body>
        <ProgressBar>{children}</ProgressBar>
      </Body>
    </html>
  );
};

export default Layout;
