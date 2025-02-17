import { favouritesSlice } from './slice.ts';

export function addToFavourites(id: number) {
	return favouritesSlice.actions.addToFavourites(id);
}

export function removeFromFavourites(id: number) {
	return favouritesSlice.actions.removeFromFavourites(id);
}

export function toggleFilterByFavourites(next: boolean) {
	return favouritesSlice.actions.toggleFilterByFavourites(next);
}
