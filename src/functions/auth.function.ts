import { axios } from '@/services/axios.service';
import { UserModel } from '@teamgather/common';
import { cookies } from 'next/headers';

/**
 * ANCHOR Authorized
 * @date 08/05/2025 - 10:54:33
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

export { Authorized };
