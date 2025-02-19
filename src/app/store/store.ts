import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersReducer, favouritesReducer } from '@/features';
import { loadingReducer } from './loading';

const reducer = combineReducers({
	loading: loadingReducer,
	favourites: favouritesReducer,
	characters: charactersReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer,
		preloadedState,
	});
};

export const store = setupStore();

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
