'use client';

import Logout from '@mui/icons-material/Logout';
import Mittraphap from '@/components/fonts/Mittraphap';
import { useAppSelector } from '@/stores/hook';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Montserrat } from 'next/font/google';
import { useState, MouseEvent } from 'react';
import { useRouter } from '@bprogress/next';

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

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const router = useRouter();

  /**
   * ANCHOR Open
   * @date 08/05/2025 - 07:22:34
   *
   * @param {MouseEvent<HTMLElement>} e
   */
  const _open = (e: MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  /**
   * ANCHOR Close
   * @date 08/05/2025 - 07:20:41
   */
  const _close = () => {
    setAnchor(null);
  };

  /**
   * ANCHOR Sign Out
   * @date 08/05/2025 - 07:23:45
   */
  const _signOut = () => {
    _close();

    router.push('/auth/signout');
  };

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
      <IconButton color="primary" onClick={_open}>
        <FaRegUserCircle />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={_close}
        onClick={_close}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}>
        <MenuItem className="min-w-40" onClick={_signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <span className="text-sm">Sign Out</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default User;
