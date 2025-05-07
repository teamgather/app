import Body from '@/components/common/body';
import ProgressBar from '@/components/common/progress-bar';
import StoreProvider from '@/stores/provider';
import '@/assets/styles/globals.css';
import { LayoutProps } from '@/types/app.type';
import { BRAND_CONSTANT, SLOGAN_CONSTANT, UserModel } from '@teamgather/common';
import { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { axios } from '@/services/axios.service';

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
 * ANCHOR Authorized
 * @date 08/05/2025 - 06:00:11
 *
 * @async
 * @returns {Promise<UserModel | null>}
 */
async function Authorized(): Promise<UserModel | null> {
  'use server';

  // cookies
  const cookieStore = await cookies();

  // me
  let me: UserModel | null = null;

  if (cookieStore.has(process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME)) {
    const accessToken: string = cookieStore.get(
      process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME,
    )!.value;

    try {
      const { data } = await axios.get('user/me', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.user) {
        me = data.user;
      }
    } catch {}
  }

  // // header
  // const header = await headers();

  // // pathname
  // const pathname = header.get('x-pathname');

  // if (pathname) {
  //   if (authorized) {
  //     if (pathname == '/auth/login') {
  //       redirect('/account');
  //     }
  //   } else {
  //     if (pathname.startsWith('/account')) {
  //       redirect('/auth/login');
  //     }
  //   }
  // }

  return me;
}

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
        <Body>
          <ProgressBar>{children}</ProgressBar>
        </Body>
      </StoreProvider>
    </html>
  );
};

export default Layout;
