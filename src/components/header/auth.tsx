import Menu from './menu';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaRegUserCircle } from 'react-icons/fa';
import { stringify } from 'querystring';

/**
 * ANCHOR Auth
 * @date 07/05/2025 - 12:13:21
 *
 * @returns {*}
 */
const Auth = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // continue url
  let continueUrl: string = '';

  if (pathname.startsWith('/auth')) {
    if (searchParams.get('continue')) {
      const next: string = encodeURIComponent(searchParams.get('continue')!);

      continueUrl = `?continue=${next}`;
    }
  } else {
    // query string
    const queryString: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      if (key != 'continue') {
        queryString[key] = value;
      }
    });

    if (Object.keys(queryString).length > 0) {
      const query: string = stringify(queryString);
      const next: string = encodeURIComponent(`${pathname}?${query}`);

      continueUrl = `?continue=${next}`;
    } else {
      if (pathname != '/') {
        const next: string = encodeURIComponent(pathname);

        continueUrl = `?continue=${next}`;
      }
    }
  }

  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-row items-center space-x-1">
        <Menu
          menu={{
            title: 'Sign In',
            pathname: `/auth/signin${continueUrl}`,
          }}
        />
        <span>/</span>
        <Menu
          menu={{
            title: 'Sign Up',
            pathname: `/auth/signup${continueUrl}`,
          }}
        />
      </div>
      <FaRegUserCircle size={24} />
    </div>
  );
};

export default Auth;
