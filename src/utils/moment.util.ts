import moment, { MomentInput } from 'moment-timezone';

/**
 * ANCHOR Moment Date Util
 * @date 10/05/2025 - 16:11:49
 *
 * @export
 * @param {MomentInput} input
 * @param {boolean} [isFull=false]
 * @returns {string}
 */
export function MomentDateUtil(
  input: MomentInput,
  isFull: boolean = false,
): string {
  const format: string = isFull ? 'dd DD/MMM/YY' : 'DD/MMM/YY';

  return moment(input).format(format);
}

/**
 * ANCHOR Moment DateTime Util
 * @date 10/05/2025 - 16:11:55
 *
 * @export
 * @param {MomentInput} input
 * @param {boolean} [isFull=false]
 * @returns {string}
 */
export function MomentDateTimeUtil(
  input: MomentInput,
  isFull: boolean = false,
): string {
  const format: string = isFull ? 'dd DD/MMM/YY, HH:mm:ss' : 'DD/MMM/YY, HH:mm';

  return moment(input).format(format);
}
