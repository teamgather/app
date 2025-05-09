import { ReactNode } from 'react';

/**
 * ANCHOR Layout Props
 * @date 09/05/2025 - 11:08:35
 *
 * @export
 * @typedef {LayoutProps}
 */
export type LayoutProps = {
  children: ReactNode;
};

/**
 * ANCHOR Page Params
 * @date 09/05/2025 - 11:07:51
 *
 * @export
 * @typedef {PageParams}
 * @template [P=unknown]
 */
export type PageParams<P = unknown> = {
  params: Promise<P>;
};

/**
 * ANCHOR Page Props
 * @date 09/05/2025 - 11:07:45
 *
 * @export
 * @typedef {PageProps}
 * @template [P=unknown]
 */
export type PageProps<P = unknown> = PageParams<P>;
