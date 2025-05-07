import { useDispatch, useSelector, useStore } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

/**
 * ANCHOR Use App Dispatch
 * @date 08/05/2025 - 04:28:21
 *
 * @type {*}
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * ANCHOR Use App Selector
 * @date 08/05/2025 - 04:28:27
 *
 * @type {*}
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * ANCHOR Use App Store
 * @date 08/05/2025 - 04:28:34
 *
 * @type {*}
 */
export const useAppStore = useStore.withTypes<AppStore>();
