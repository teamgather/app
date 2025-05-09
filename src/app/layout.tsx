import Body from '@/components/common/body';
import StoreProvider from '@/stores/provider';
import '@/assets/styles/globals.css';
import { LayoutProps } from '@/types/app.type';
import { BRAND_CONSTANT, SLOGAN_CONSTANT, UserModel } from '@teamgather/common';
import { Metadata, Viewport } from 'next';
import { Authorized } from '@/functions/auth.function';

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
  manifest: '/site.webmanifest',
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

  // me
  const me: UserModel | null = await Authorized();

  // is authorized
  const isAuthorized: boolean = !!me;

  // ANCHOR Render
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <StoreProvider isAuthorized={isAuthorized} me={me}>
        <Body>{children}</Body>
      </StoreProvider>
    </html>
  );
};

export default Layout;
