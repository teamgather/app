import { IconButton } from '@mui/material';
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
    <div className="flex flex-row">
      <IconButton aria-label="fingerprint" color="primary">
        <FaRegUserCircle />
      </IconButton>
    </div>
  );
};

export default Auth;
