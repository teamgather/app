import { ReactNode } from 'react';

/**
 * ANCHOR Layout Props
 * @date 06/05/2025 - 23:36:43
 *
 * @export
 * @typedef {LayoutProps}
 */
export type LayoutProps = {
  children: ReactNode;
};

/**
 * ANCHOR Page Params
 * @date 06/05/2025 - 23:37:04
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
 * @date 06/05/2025 - 23:37:10
 *
 * @export
 * @typedef {PageProps}
 * @template [P=unknown]
 */
export type PageProps<P = unknown> = PageParams<P>;
