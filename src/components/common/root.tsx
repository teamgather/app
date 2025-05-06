'use client';

import { axios } from '@/services/axios.service';
import { LocaleEnum } from '@fandom-me/common';
import { useLocale } from 'next-intl';
import { ReactNode, useEffect } from 'react';

/**
 * ANCHOR Props
 * @date 06/05/2025 - 23:22:56
 *
 * @typedef {Props}
 */
type Props = {
  children: ReactNode;
};

/**
 * ANCHOR Root
 * @date 14/04/2025 - 16:26:45
 *
 * @param {Props} props
 * @returns {*}
 */
const Root = (props: Props) => {
  const { children } = props;

  const locale: LocaleEnum = useLocale() as LocaleEnum;

  /**
   * ANCHOR Locale
   * @date 14/04/2025 - 16:36:03
   *
   * @async
   * @param {LocaleEnum} locale
   * @returns {*}
   */
  const _locale = async (locale: LocaleEnum) => {
    try {
      await axios.post('locale', {
        locale,
      });
    } catch {}
  };

  useEffect(() => {
    _locale(locale);
  }, [locale]);

  // ANCHOR Render
  return children;
};

export default Root;
