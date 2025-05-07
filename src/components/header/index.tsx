import Auth from './auth';
import Brand from './brand';
import Menu from './menu';

/**
 * ANCHOR Header
 * @date 07/05/2025 - 04:01:11
 *
 * @returns {*}
 */
const Header = () => {
  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-10 border-b-2 border-black">
      <div className="flex-1 flex flex-row items-center space-x-10">
        <Brand />
        <Menu />
      </div>
      <Auth />
    </div>
  );
};

export default Header;
