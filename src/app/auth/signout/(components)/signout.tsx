'use client';

import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constants/message.constant';
import { axios, AxiosError } from '@/services/axios.service';
import cogoToast from '@dsdeepak17/cogo-toast';
import { useEffect } from 'react';
import { nl2br } from 'react-js-nl2br';

/**
 * ANCHOR Props
 * @date 08/05/2025 - 07:26:52
 *
 * @typedef {Props}
 */
type Props = {
  apiPath: string;
  subPath: string;
};

/**
 * ANCHOR Sign Out
 * @date 08/05/2025 - 07:27:08
 *
 * @param {Props} props
 * @returns {*}
 */
const SignOut = (props: Props) => {
  const { apiPath, subPath } = props;

  /**
   * ANCHOR Sign Out
   * @date 08/05/2025 - 07:33:52
   *
   * @async
   * @returns {*}
   */
  const _signOut = async () => {
    try {
      await axios.get(`${apiPath}/${subPath}`);

      window.location.href = '/';
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response &&
        e.response.data &&
        e.response.data.eMessage
      ) {
        cogoToast.error(nl2br(e.response.data.eMessage));
      } else {
        cogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
      }
    }
  };

  useEffect(() => {
    _signOut();
  }, []);

  // ANCHOR Render
  return <></>;
};

export default SignOut;
