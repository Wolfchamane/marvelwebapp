import { configureStore } from '@reduxjs/toolkit';
import { favouritesReducer } from '../../features/favourites/store';
import { loadingReducer } from './loading';

export const store = configureStore({
	reducer: {
		loading: loadingReducer,
		favourites: favouritesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
