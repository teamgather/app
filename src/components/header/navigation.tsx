import Menu from './menu';
import { MenuItem } from './menu.interface';

/**
 * ANCHOR Navigation
 * @date 07/05/2025 - 17:19:37
 *
 * @returns {*}
 */
const Navigation = () => {
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
    {
      title: 'Members',
      pathname: '/members',
    },
  ];

  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-6">
      {menus.map((menu, index) => {
        return <Menu key={index} menu={menu} />;
      })}
    </div>
  );
};

export default Navigation;
