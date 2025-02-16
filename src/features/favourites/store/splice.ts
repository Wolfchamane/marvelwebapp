import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FavouritesState {
	value: number[];
	filterByFavourites: boolean;
}

const initialState: FavouritesState = {
	value: [],
	filterByFavourites: false,
};

export const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		addToFavourites: (state, action: PayloadAction<number>) => {
			const { payload } = action;
			state.value.push(payload);

			return state;
		},
		removeFromFavourites: (state, action: PayloadAction<number>) => {
			const { payload } = action;
			state.value.splice(state.value.indexOf(payload), 1);

			return state;
		},
		toggleFilterByFavourites: (state, action: PayloadAction<boolean>) => {
			state.filterByFavourites = action.payload;

			return state;
		},
	},
});

export const favouritesReducer = favouritesSlice.reducer;
