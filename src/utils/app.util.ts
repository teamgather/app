import { BRAND_CONSTANT } from '@teamgather/common';

/**
 * ANCHOR Title Util
 * @date 07/05/2025 - 17:43:06
 *
 * @export
 * @param {...string[]} texts
 * @returns {string}
 */
export function TitleUtil(...texts: string[]): string {
  const title: string = BRAND_CONSTANT;

  if (texts.length > 0) {
    texts.reverse();

    return `${texts.join(' ← ')} - ${title}`;
  }

  return title;
}
