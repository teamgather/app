import Link from 'next/link';
import classNames from 'classnames';
import { MenuItem } from './menu.interface';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

/**
 * ANCHOR Montserrat
 * @date 07/05/2025 - 05:50:25
 *
 * @type {*}
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

/**
 * ANCHOR Props
 * @date 07/05/2025 - 17:17:49
 *
 * @typedef {Props}
 */
type Props = {
  menu: MenuItem;
};

/**
 * ANCHOR Menu
 * @date 07/05/2025 - 04:42:12
 *
 * @returns {*}
 */
const Menu = (props: Props) => {
  const { menu } = props;

  const pathname = usePathname();

  // is active
  let isActive: boolean = false;

  if (menu.pathname == '/') {
    if (menu.pathname == pathname) {
      isActive = true;
    }
  } else {
    if (pathname.startsWith(menu.pathname)) {
      isActive = true;
    }
  }

  // ANCHOR Render
  return (
    <Link
      href={menu.pathname}
      className={classNames({
        'hover:underline underline-offset-8': true,
        underline: isActive,
      })}
      style={{
        fontFamily: montserrat.style.fontFamily,
        fontStyle: montserrat.style.fontStyle,
      }}>
      <span className="text-sm font-medium uppercase tracking-wide">
        {menu.title}
      </span>
    </Link>
  );
};

export default Menu;
