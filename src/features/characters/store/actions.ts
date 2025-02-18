import type { CharactersTypes } from '../types';
import { charactersSlice } from './slice';

export function storeCharacters(items: CharactersTypes.Character[]) {
	return charactersSlice.actions.storeCharacters(items);
}
