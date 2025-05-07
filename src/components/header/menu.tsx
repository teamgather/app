import Link from 'next/link';
import { MenuItem } from './menu.interface';
import { Montserrat } from 'next/font/google';

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
 * ANCHOR Menu
 * @date 07/05/2025 - 04:42:12
 *
 * @returns {*}
 */
const Menu = () => {
  // menus
  const menus: MenuItem[] = [
    {
      title: 'Projects',
      pathname: '/projects',
    },
    {
      title: 'Tasks',
      pathname: '/tasks',
    },
  ];

  // ANCHOR Render
  return (
    <div
      className="flex flex-row items-center space-x-5"
      style={{
        fontFamily: montserrat.style.fontFamily,
        fontStyle: montserrat.style.fontStyle,
      }}>
      {menus.map((menu, index) => {
        return (
          <Link key={index} href={menu.pathname} className="hover:underline">
            <span className="text-sm font-medium uppercase tracking-wide">
              {menu.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
