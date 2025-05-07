import Auth from './auth';
import Brand from './brand';
import Navigation from './navigation';
import User from './user';
import { useAppSelector } from '@/stores/hook';

/**
 * ANCHOR Header
 * @date 07/05/2025 - 04:01:11
 *
 * @returns {*}
 */
const Header = () => {
  const { isAuthorized } = useAppSelector((state) => state.auth);

  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-10 border-b-2 border-black">
      <div className="flex-1 flex flex-row items-center space-x-12">
        <Brand />
        <Navigation />
      </div>
      {isAuthorized && <User />}
      {!isAuthorized && <Auth />}
    </div>
  );
};

export default Header;
