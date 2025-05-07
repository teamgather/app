import { useAppSelector } from '@/stores/hook';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import { Montserrat } from 'next/font/google';
import Mittraphap from '../fonts/Mittraphap';

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

// font family
const fontFamily: string = [
  montserrat.style.fontFamily,
  Mittraphap.style.fontFamily,
].join(', ');

/**
 * ANCHOR User
 * @date 08/05/2025 - 06:14:25
 *
 * @returns {*}
 */
const User = () => {
  const { me } = useAppSelector((state) => state.auth);

  // ANCHOR Render
  return (
    <div className="flex flex-row items-center space-x-3">
      {me && (
        <div
          className="text-sm text-right font-medium uppercase tracking-wide truncate max-w-52"
          style={{
            fontFamily,
            fontStyle: montserrat.style.fontStyle,
          }}>
          {me.name}
        </div>
      )}
      <IconButton aria-label="fingerprint" color="primary">
        <FaRegUserCircle />
      </IconButton>
    </div>
  );
};

export default User;
