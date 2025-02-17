import { loadingSlice } from './slice';

export function toggleLoading(value: boolean) {
	return loadingSlice.actions.toggleLoading(value);
}
