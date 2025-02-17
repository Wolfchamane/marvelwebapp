import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoadingSliceState {
	value: boolean;
}

const initialState: LoadingSliceState = {
	value: false,
};

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		toggleLoading: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;

			return state;
		},
	},
});

export const loadingReducer = loadingSlice.reducer;
