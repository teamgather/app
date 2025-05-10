/**
 * ANCHOR Form Select Option Interface
 * @date 10/05/2025 - 21:38:54
 *
 * @export
 * @interface FormSelectOptionInterface
 * @typedef {FormSelectOptionInterface}
 * @template [T=unknown]
 */
export interface FormSelectOptionInterface<T = unknown> {
  label: string;
  value: string;
  payload: T;
}
