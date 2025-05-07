import Menu from './menu';
import { FaRegUserCircle } from 'react-icons/fa';

/**
 * ANCHOR Auth
 * @date 07/05/2025 - 12:13:21
 *
 * @returns {*}
 */
const Auth = () => {
  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-row items-center space-x-1">
        <Menu
          menu={{
            title: 'Sign In',
            pathname: '/auth/signin',
          }}
        />
        <span>/</span>
        <Menu
          menu={{
            title: 'Sign Up',
            pathname: '/auth/signup',
          }}
        />
      </div>
      <FaRegUserCircle size={24} />
    </div>
  );
};

export default Auth;
