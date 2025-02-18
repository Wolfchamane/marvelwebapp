import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CharactersTypes } from '../types';

export interface CharactersState {
	items: CharactersTypes.Character[];
}

const initialState: CharactersState = {
	items: [],
};

export const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		storeCharacters: (state, action: PayloadAction<CharactersTypes.Character[]>) => {
			state.items = action.payload;

			return state;
		},
	},
});

export const charactersReducer = charactersSlice.reducer;
